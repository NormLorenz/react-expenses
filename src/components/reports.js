import React, { Component } from 'react'
import * as utilities from '../helpers/utilities';

import PropertyDisplay from '../helpers/propertyDisplay';
import CategoryDisplay from '../helpers/categoryDisplay';
import ActiveDisplay from '../helpers/activeDisplay';

import { connect } from 'react-redux';
import { fetchTaxYear } from '../actions/taxyear';
import { fetchExpenses } from '../actions/expenses';
import { fetchProperties } from '../actions/properties';
import { fetchCategories } from '../actions/categories';

import Moment from 'react-moment';

class Reports extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 0,
      expenses: [],
      categories: [],
      categoryCreditsTotal: 0,
      categoryDebitsTotal: 0,
      properties: [],
      propertyCreditsTotal: 0,
      propertyDebitsTotal: 0,
      debitsTotal: 0,
      creditsTotal: 0
    };
  }

  // https://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
  calculateSum(expenses, key, field, isDebit) {
    let filteredExpenses = expenses.filter((expense) =>
      expense.data.isDebit === isDebit && expense.data[field] === key);
    let sum = filteredExpenses.reduce((sum, expense) =>
      sum + expense.data.amount, 0);
    return sum;
  }

  componentWillMount() {
    this.props.fetchTaxYear();
    this.props.fetchExpenses();
    this.props.fetchProperties();
    this.props.fetchCategories();

  }

  componentWillReceiveProps(newProps) {

    // taxYear
    if (newProps.taxyearObject.taxYear) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })

      // expenses
      if (newProps.expenseObject.expenses) {
        let expenses = newProps.expenseObject.expenses.sort(
          (a, b) => a.data.date < b.data.date ? -1 : 1);
        let debitsTotal = 0;
        let creditsTotal = 0;
        expenses.forEach(function (expense) {
          if (expense.data.isDebit === true)
            debitsTotal += expense.data.amount;
          else
            creditsTotal += expense.data.amount;
        });

        this.setState({
          expenses: expenses,
          debitsTotal: debitsTotal,
          creditsTotal: creditsTotal
        });

        // properties
        if (newProps.propertyObject.properties) {
          let properties = newProps.propertyObject.properties.sort(
            (a, b) => a.data.description < b.data.description ? -1 : 1);
          let propertyCreditsTotal = 0;
          let propertyDebitsTotal = 0;
          let _this = this;

          properties.forEach(function (property) {
            property.credit = _this.calculateSum(expenses, property.key, 'property', false);
            property.debit = _this.calculateSum(expenses, property.key, 'property', true);
            propertyCreditsTotal += property.credit;
            propertyDebitsTotal += property.debit;
          });

          this.setState({
            properties: properties,
            propertyCreditsTotal: propertyCreditsTotal,
            propertyDebitsTotal: propertyDebitsTotal
          });
        }

        // categories
        if (newProps.categoryObject.categories) {
          let categories = newProps.categoryObject.categories.sort(
            (a, b) => a.data.description < b.data.description ? -1 : 1);
          let categoryCreditsTotal = 0;
          let categoryDebitsTotal = 0;
          let _this = this;

          categories.forEach(function (category) {
            category.credit = _this.calculateSum(expenses, category.key, 'category', false);
            category.debit = _this.calculateSum(expenses, category.key, 'category', true);
            categoryCreditsTotal += category.credit;
            categoryDebitsTotal += category.debit;
          });

          this.setState({
            categories: categories,
            categoryCreditsTotal: categoryCreditsTotal,
            categoryDebitsTotal: categoryDebitsTotal
          });
        }
      }
    }
  }

  render() {

    let filteredCredits = this.state.expenses.filter(expense => {
      return expense.data.isDebit === false;
    });

    let credits = filteredCredits.map(expense => {
      return (
        <tr key={expense.key}>
          <td><Moment date={expense.data.date} format='L' /></td>
          <td>{expense.data.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.data.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.data.property} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.data.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let filteredDebits = this.state.expenses.filter(expense => {
      return expense.data.isDebit === true;
    });

    let debits = filteredDebits.map(expense => {
      return (
        <tr key={expense.key}>
          <td><Moment date={expense.data.date} format='L' /></td>
          <td>{expense.data.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.data.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.data.property} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.data.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.data.description}</td>
          <td><ActiveDisplay isActive={property.data.isActive} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(property.credit)}</td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(property.debit)}</td>
          <td></td>
        </tr>
      );
    });

    let categories = this.state.categories.map(category => {
      return (
        <tr key={category.key}>
          <td>{category.data.description}</td>
          <td><ActiveDisplay isActive={category.data.isActive} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(category.credit)}</td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(category.debit)}</td>
          <td></td>
        </tr>
      );
    });

    return (
      <div className='w3-container' >
        <h4>Reports for tax year {this.state.taxYear}</h4>

        <div className='w3-section'>
          <h5>Cash In</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '18%' }}>Date</th>
                <th style={{ width: '30%' }}>Description</th>
                <th style={{ width: '20%' }}>Category</th>
                <th style={{ width: '20%' }}>Property</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='4' className='w3-right-align'><b>Total:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.creditsTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {credits}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Cash Out</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '18%' }}>Date</th>
                <th style={{ width: '30%' }}>Description</th>
                <th style={{ width: '20%' }}>Category</th>
                <th style={{ width: '20%' }}>Property</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='4' className='w3-right-align'><b>Total:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.debitsTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {debits}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Properties</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '58%' }}>Description</th>
                <th style={{ width: '20%' }}>Active</th>
                <th className='w3-right-align' style={{ width: '10%' }}>Credits</th>
                <th className='w3-right-align' style={{ width: '10%' }}>Debits</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='2' className='w3-right-align'><b>Totals:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.propertyCreditsTotal)}</td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.propertyDebitsTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {properties}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Categories</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '58%' }}>Description</th>
                <th style={{ width: '20%' }}>Active</th>
                <th className='w3-right-align' style={{ width: '10%' }}>Credits</th>
                <th className='w3-right-align' style={{ width: '10%' }}>Debits</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='2' className='w3-right-align'><b>Totals:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.categoryCreditsTotal)}</td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.categoryDebitsTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {categories}
            </tbody>
          </table>
        </div>

      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    taxyearObject: state.taxyearObject,
    expenseObject: state.expenseObject,
    propertyObject: state.propertyObject,
    categoryObject: state.categoryObject
  };
}

export default connect(
  mapStateToProps,
  {
    fetchTaxYear: fetchTaxYear,
    fetchExpenses: fetchExpenses,
    fetchProperties: fetchProperties,
    fetchCategories: fetchCategories
  }
)(Reports);