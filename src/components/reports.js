import React, { Component } from 'react'
import firebase from 'firebase';
import { convertCentsToDollars } from '../helpers/utilities';

import Property from '../helpers/property';
import Category from '../helpers/category';

// import Debit from '../helpers/debit'

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
        snapshot.forEach(function (data) {
          if (data.val().isDebit === false) {
            let credit = {
              date: data.val().date,
              description: data.val().description,
              category: data.val().category,
              property: data.val().property,
              amount: data.val().amount
            }
            credits.push(credit);
          }
        });

        this.setState({
          credits: credits.sort(function (a, b) {
            return b.date < a.date;
          })
        });
        console.log(credits);
      });

      const debitsRef = firebase.database().ref('expenses').orderByChild('taxYear').equalTo(this.state.taxYear);
      debitsRef.once('value', snapshot => {
        let debits = [];
        snapshot.forEach(function (data) {
          if (data.val().isDebit === true) {
            let debit = {
              date: data.val().date,
              description: data.val().description,
              category: data.val().category,
              property: data.val().property,
              amount: data.val().amount
            }
            debits.push(debit);
          }
        });

        this.setState({
          debits: debits.sort(function (a, b) {
            return b.date < a.date;
          })
        });
        console.log(debits);
      });

      const propertiesRef = firebase.database().ref('properties').orderByChild('description');
      propertiesRef.once('value', snapshot => {
        this.setState({
          properties: snapshot.numChildren()
        });
      });

      const categoriesRef = firebase.database().ref('categories').orderByChild('description');
      categoriesRef.once('value', snapshot => {
        this.setState({
          categories: snapshot.numChildren()
        });
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


    return (
      <div className='w3-container'>
        <h3>Reports for tax year {this.state.taxYear}</h3>

        <div className='w3-section'>
          <h4>Credits {convertCentsToDollars(this.state.creditsTotal)}</h4>
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
          <h4>Debits {convertCentsToDollars(this.state.debitsTotal)}</h4>
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
          <h4>Properties {convertCentsToDollars(this.state.propertiesTotal)}</h4>
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
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h4>Categories {convertCentsToDollars(this.state.categoriesTotal)}</h4>
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
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

export default Reports;