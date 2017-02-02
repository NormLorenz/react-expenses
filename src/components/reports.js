import React, { Component } from 'react'
import firebase from 'firebase';
import { convertCentsToDollars } from '../helpers/utilities';

import Property from '../helpers/property';
import Category from '../helpers/category';
import Active from '../helpers/active';

import Moment from 'react-moment';
// import moment from 'moment';

class Reports extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 1776,
      expenses: [],
      categories: [],
      properties: [],
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
          expenses: expenses.sort(function (a, b) {
            return b.date < a.date;
          }),
          creditsTotal: creditsTotal,
          debitsTotal: debitsTotal
        });

        const propertiesRef = firebase.database().ref('properties').orderByChild('description');
        propertiesRef.once('value', snapshot => {
          let properties = [];
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
          });

          this.setState({
            properties: properties
          });
        });

        const categoriesRef = firebase.database().ref('categories').orderByChild('description');
        categoriesRef.once('value', snapshot => {
          let categories = [];
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
          });

          this.setState({
            categories: categories
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
          <td><Category categories={this.state.categories} category={expense.category} /></td>
          <td><Property properties={this.state.properties} property={expense.property} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(expense.amount)}</td>
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
          <td><Category categories={this.state.categories} category={expense.category} /></td>
          <td><Property properties={this.state.properties} property={expense.property} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(expense.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.description}</td>
          <td><Active isActive={property.isActive} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(property.credit)}</td>
          <td className='w3-right-align'>{convertCentsToDollars(property.debit)}</td>
          <td></td>
        </tr>
      );
    });

    let categories = this.state.categories.map(category => {
      return (
        <tr key={category.key}>
          <td>{category.description}</td>
          <td><Active isActive={category.isActive} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(category.credit)}</td>
          <td className='w3-right-align'>{convertCentsToDollars(category.debit)}</td>
          <td></td>
        </tr>
      );
    });

    return (
      <div className='w3-container' >
        <h4>Reports for tax year {this.state.taxYear}</h4>

        <div className='w3-section'>
          <h5>Credits {convertCentsToDollars(this.state.creditsTotal)}</h5>
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
            <tbody>
              {credits}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Debits {convertCentsToDollars(this.state.debitsTotal)}</h5>
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