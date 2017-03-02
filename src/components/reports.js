import React, { Component } from 'react'
import firebase from 'firebase';
import * as utilities from '../helpers/utilities'; 

import PropertyDisplay from '../helpers/propertyDisplay';
import CategoryDisplay from '../helpers/categoryDisplay';
import ActiveDisplay from '../helpers/activeDisplay';

import Moment from 'react-moment';

class Reports extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 1776,
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
  calculateSum(key, field, isDebit) {
    let filteredExpenses = this.state.expenses.filter((expense) =>
      expense.isDebit === isDebit && expense[field] === key);
    let sum = filteredExpenses.reduce((sum, expense) =>
      sum + expense.amount, 0);
    return sum;
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const taxYearRef = rootRef.child('taxYear');
    taxYearRef.once('value', snapshot => {
      this.setState({
        taxYear: snapshot.val()
      });

      const expensesRef = firebase.database().ref('expenses').orderByChild('taxYear').equalTo(this.state.taxYear);
      expensesRef.once('value', snapshot => {
        let expenses = [];
        let creditsTotal = 0;
        let debitsTotal = 0;
        snapshot.forEach(function (data) {
          let expense = {
            key: data.key,
            date: data.val().date,
            description: data.val().description,
            category: data.val().category,
            property: data.val().property,
            isDebit: data.val().isDebit,
            amount: data.val().amount
          }
          if (expense.isDebit === true) {
            debitsTotal += expense.amount;
          }
          else {
            creditsTotal += expense.amount;
          }
          expenses.push(expense);
        });

        this.setState({
          expenses: expenses.sort((a, b) => a.date < b.date ? -1 : 1),
          creditsTotal: creditsTotal,
          debitsTotal: debitsTotal
        });

        const propertiesRef = firebase.database().ref('properties').orderByChild('description');
        propertiesRef.once('value', snapshot => {
          let properties = [];
          let propertyCreditsTotal = 0;
          let propertyDebitsTotal = 0;
          let _this = this;
          snapshot.forEach(function (data) {
            let property = {
              key: data.key,
              description: data.val().description,
              isActive: data.val().isActive,
              credit: _this.calculateSum(data.key, 'property', false),
              debit: _this.calculateSum(data.key, 'property', true)
            }
            properties.push(property);
            propertyCreditsTotal += property.credit;
            propertyDebitsTotal += property.debit;
          });

          this.setState({
            properties: properties,
            propertyCreditsTotal: propertyCreditsTotal,
            propertyDebitsTotal: propertyDebitsTotal
          });
        });

        const categoriesRef = firebase.database().ref('categories').orderByChild('description');
        categoriesRef.once('value', snapshot => {
          let categories = [];
          let categoryCreditsTotal = 0;
          let categoryDebitsTotal = 0;
          let _this = this;
          snapshot.forEach(function (data) {
            let category = {
              key: data.key,
              description: data.val().description,
              isActive: data.val().isActive,
              credit: _this.calculateSum(data.key, 'category', false),
              debit: _this.calculateSum(data.key, 'category', true)
            }
            categories.push(category);
            categoryCreditsTotal += category.credit;
            categoryDebitsTotal += category.debit;
          });

          this.setState({
            categories: categories,
            categoryCreditsTotal: categoryCreditsTotal,
            categoryDebitsTotal: categoryDebitsTotal
          });
        });
      });
    });
  }

  render() {

    let filteredCredits = this.state.expenses.filter(expense => {
      return expense.isDebit === false;
    });

    let credits = filteredCredits.map(expense => {
      return (
        <tr key={expense.key}>
          <td><Moment date={expense.date} format='L' /></td>
          <td>{expense.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.property} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let filteredDebits = this.state.expenses.filter(expense => {
      return expense.isDebit === true;
    });

    let debits = filteredDebits.map(expense => {
      return (
        <tr key={expense.key}>
          <td><Moment date={expense.date} format='L' /></td>
          <td>{expense.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.property} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.description}</td>
          <td><ActiveDisplay isActive={property.isActive} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(property.credit)}</td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(property.debit)}</td>
          <td></td>
        </tr>
      );
    });

    let categories = this.state.categories.map(category => {
      return (
        <tr key={category.key}>
          <td>{category.description}</td>
          <td><ActiveDisplay isActive={category.isActive} /></td>
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

export default Reports;