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
      credits: [],
      creditsTotal: 0,
      debits: [],
      debitsTotal: 0,
      categories: [],
      categoriesTotal: 0,
      properties: [],
      propertiesTotal: 0
    };
  }

  componentDidMount() {

    const rootRef = firebase.database().ref();
    const taxYearRef = rootRef.child('taxYear');
    taxYearRef.once('value', snapshot => {
      this.setState({
        taxYear: snapshot.val()
      });

      const creditsRef = firebase.database().ref('expenses').orderByChild('taxYear').equalTo(this.state.taxYear);
      creditsRef.once('value', snapshot => {
        let credits = [];
        let creditsTotal = 0;
        snapshot.forEach(function (data) {
          if (data.val().isDebit === false) {
            let credit = {
              key: data.key,
              date: data.val().date,
              description: data.val().description,
              category: data.val().category,
              property: data.val().property,
              amount: data.val().amount
            }
            credits.push(credit);
            creditsTotal += credit.amount;
          }
        });

        this.setState({
          credits: credits.sort(function (a, b) {
            return b.date < a.date;
          }),
          creditsTotal: creditsTotal
        });
        console.log(credits);
      });

      const debitsRef = firebase.database().ref('expenses').orderByChild('taxYear').equalTo(this.state.taxYear);
      debitsRef.once('value', snapshot => {
        let debits = [];
        let debitsTotal = 0;
        snapshot.forEach(function (data) {
          if (data.val().isDebit === true) {
            let debit = {
              key: data.key,
              date: data.val().date,
              description: data.val().description,
              category: data.val().category,
              property: data.val().property,
              amount: data.val().amount
            }
            debits.push(debit);
            debitsTotal += debit.amount;
          }
        });

        this.setState({
          debits: debits.sort(function (a, b) {
            return b.date < a.date;
          }),
          debitsTotal: debitsTotal
        });
        console.log(debits);
      });

    });

    const propertiesRef = firebase.database().ref('properties').orderByChild('description');
    propertiesRef.once('value', snapshot => {
      let properties = [];
      let propertiesTotal = 0;
      snapshot.forEach(function (data) {
        let property = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive,
          amount: 0
        }
        properties.push(property);
      });

      this.setState({
        properties: properties,
        propertiesTotal: propertiesTotal
      });
    });

    const categoriesRef = firebase.database().ref('categories').orderByChild('description');
    categoriesRef.once('value', snapshot => {
      let categories = [];
      let categoriesTotal = 0;
      snapshot.forEach(function (data) {
        let category = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive,
          amount: 0
        }
        categories.push(category);
      });

      this.setState({
        categories: categories,
        categoriesTotal: categoriesTotal
      });
    });

  }

  render() {

    let credits = this.state.credits.map(credit => {
      return (
        <tr key={credit.key}>
          <td><Moment date={credit.date} format='L' /></td>
          <td>{credit.description}</td>
          <td><Category categories={this.state.categories} category={credit.category} /></td>
          <td><Property properties={this.state.properties} property={credit.property} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(credit.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let debits = this.state.debits.map(debit => {
      return (
        <tr key={debit.key}>
          <td><Moment date={debit.date} format='L' /></td>
          <td>{debit.description}</td>
          <td><Category categories={this.state.categories} category={debit.category} /></td>
          <td><Property properties={this.state.properties} property={debit.property} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(debit.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.description}</td>
          <td><Active isActive={property.isActive} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(property.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let categories = this.state.categories.map(category => {
      return (
        <tr key={category.key}>
          <td>{category.description}</td>
          <td><Active isActive={category.isActive} /></td>
          <td className='w3-right-align'>{convertCentsToDollars(category.amount)}</td>
          <td></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Reports for tax year {this.state.taxYear}</h4>

        <div className='w3-section'>
          <h5>Credits {convertCentsToDollars(this.state.creditsTotal)}</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Date</th>
                <th style={{ width: '30%' }}>Description</th>
                <th style={{ width: '20%' }}>Category</th>
                <th style={{ width: '20%' }}>Property</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '5%' }}></th>
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
                <th style={{ width: '15%' }}>Date</th>
                <th style={{ width: '30%' }}>Description</th>
                <th style={{ width: '20%' }}>Category</th>
                <th style={{ width: '20%' }}>Property</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {debits}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Properties {convertCentsToDollars(this.state.propertiesTotal)}</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '65%' }}>Description</th>
                <th style={{ width: '20%' }}>Active</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {properties}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Categories {convertCentsToDollars(this.state.categoriesTotal)}</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '65%' }}>Description</th>
                <th style={{ width: '20%' }}>Active</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {categories}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default Reports;