import React, { Component } from 'react'
import firebase from 'firebase';
import { convertCentsToDollars } from '../helpers/utilities';

// import Property from '../helpers/property';
// import Category from '../helpers/category';
// import Debit from '../helpers/debit'

// import Moment from 'react-moment';
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

      const creditsRef = firebase.database().ref('expenses').orderByChild('date');
      creditsRef.once('value', snapshot => {
        this.setState({
          credits: snapshot.numChildren()
        });
      });

      const debitsRef = firebase.database().ref('expenses').orderByChild('date');
      debitsRef.once('value', snapshot => {
        this.setState({
          debits: snapshot.numChildren()
        });
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

    return (
      <div className='w3-container'>
        <h3>Report for tax year {this.state.taxYear}</h3>

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