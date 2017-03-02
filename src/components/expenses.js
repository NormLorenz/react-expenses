import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';

import PropertyDisplay from '../helpers/propertyDisplay';
import CategoryDisplay from '../helpers/categoryDisplay';
import ExpenseTypeSlider from '../helpers/expenseTypeSlider';
import ExpenseTypeDisplay from '../helpers/expenseTypeDisplay';
import * as utilities from '../helpers/utilities';

import Moment from 'react-moment';
import moment from 'moment';
import NotificationSystem from 'react-notification-system';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    width: '400px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Expenses extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 1776,
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,

      key: null,
      date: null,
      description: null,
      category: null,
      property: null,
      isDebit: false,
      amount: null,

      expenses: [],
      categories: [],
      properties: []
    };

    this._notificationSystem = null;
  }

  addNotification(event) {
    if (event) event.preventDefault();
    if (this._notificationSystem) {
      this._notificationSystem.addNotification({
        message: 'Record saved',
        level: 'info',
        position: 'br'
      });
    }
  }

  handleOpen(expense, operation) {
    if (operation === 'new') {
      this.setState({
        operation: operation,
        operationText: 'Create a new expense',
        submitText: 'Save',
        key: '',
        date: '',
        description: '',
        category: '',
        property: '',
        isDebit: true,
        amount: ''
      });
    }
    else if (operation === 'edit') {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing expense',
        submitText: 'Save',
        key: expense.key,
        date: moment(expense.date).format('L'),
        description: expense.description,
        category: expense.category,
        property: expense.property,
        isDebit: expense.isDebit,
        amount: utilities.convertCentsToDollars(expense.amount)
      });
    }
    else {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing expense',
        submitText: 'Delete',
        key: expense.key,
        date: moment(expense.date).format('L'),
        description: expense.description,
        category: expense.category,
        property: expense.property,
        isDebit: expense.isDebit,
        amount: utilities.convertCentsToDollars(expense.amount)
      });
    }

    this.setState({ showModal: true });
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    // calulate a date if only the day and month are provided
    let calculatedDate = moment(this.state.date);
    if (calculatedDate.year() === 2001) {
      calculatedDate.year(this.state.taxYear);
    }

    // convert dollars and cents to cents
    let calculatedAmount = (this.state.amount).toString().replace(/[^0-9.]/g, '');
    calculatedAmount = Math.round(calculatedAmount * 100);

    let expense = {
      date: calculatedDate.toISOString(),
      taxYear: moment(calculatedDate).year(),
      description: this.state.description,
      category: this.state.category,
      property: this.state.property,
      isDebit: this.state.isDebit,
      amount: calculatedAmount
    }

    if (this.state.operation === 'new') {
      const expensesRef = firebase.database().ref('expenses');
      expensesRef.push(expense);
    }
    else if (this.state.operation === 'edit') {
      const expensesRef = firebase.database().ref('expenses').child(this.state.key);
      expensesRef.update(expense);
    }
    else {
      const expensesRef = firebase.database().ref('expenses').child(this.state.key);
      expensesRef.remove();
    }

    this.addNotification();
    this.setState({ showModal: false });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const taxYearRef = rootRef.child('taxYear');
    taxYearRef.on('value', snapshot => {
      this.setState({
        taxYear: snapshot.val()
      })

      const expensesRef = firebase.database().ref('expenses').orderByChild('taxYear').equalTo(this.state.taxYear);
      expensesRef.on('value', snapshot => {

        let expenses = [];
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
          expenses.push(expense);
        });

        this.setState({
          expenses: expenses.sort((a, b) => a.date < b.date ? -1 : 1)
        });
      });
    });

    const categoriesRef = firebase.database().ref('categories').orderByChild('description');
    categoriesRef.on('value', snapshot => {
      let categories = [];
      snapshot.forEach(function (data) {
        let category = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive
        }
        categories.push(category);
      });

      this.setState({
        categories: categories
      });
    });

    const propertiesRef = firebase.database().ref('properties').orderByChild('description');
    propertiesRef.on('value', snapshot => {
      let properties = [];
      snapshot.forEach(function (data) {
        let property = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive
        }
        properties.push(property);
      });

      this.setState({
        properties: properties
      });
    });
  }

  render() {
    const divStyle = { height: '475px', overflow: 'scroll' };
    const col1Style = { width: '10%' };
    const col2Style = { width: '25%' };
    const col3Style = { width: '15%' };
    const col4Style = { width: '15%' };
    const col5Style = { width: '10%' };
    const col6Style = { width: '8%' };
    const col7Style = { width: '17%' };

    let items = this.state.expenses.map(expense => {
      return (
        <tr key={expense.key}>
          <td><Moment date={expense.date} format='L' /></td>
          <td>{expense.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.property} /></td>
          <td><ExpenseTypeDisplay isDebit={expense.isDebit} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.amount)}</td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, 'edit')}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, 'delete')}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Expenses for tax year {this.state.taxYear}</h4>
        <NotificationSystem ref={n => this._notificationSystem = n} />

        <div style={divStyle}>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={col1Style}>Date</th>
                <th style={col2Style}>Description</th>
                <th style={col3Style}>Category</th>
                <th style={col4Style}>Property</th>
                <th style={col5Style}>Type</th>
                <th style={col6Style}>Amount</th>
                <th style={col7Style}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, 'new')}>New expense</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>{this.state.operationText}</h4>
            </div>
            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.date} name='date' onChange={this.handleInputChange.bind(this)} autoFocus />
                <label className='w3-label'>Date</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} name='description' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <select className='w3-select w3-border w3-white w3-round' style={{ paddingLeft: '6px' }} name='category' value={this.state.category} onChange={this.handleInputChange.bind(this)} >
                  {this.state.categories.map(category => { return <option className='w3-text-grey' key={category.key} value={category.key}>{category.description}</option> })}
                </select>
                <label className='w3-label'>Category</label>
              </div>
              <div className='w3-section'>
                <select className='w3-select w3-border w3-white w3-round' style={{ paddingLeft: '6px' }} name='property' value={this.state.property} onChange={this.handleInputChange.bind(this)} >
                  {this.state.properties.map(property => { return <option className='w3-text-grey' key={property.key} value={property.key}>{property.description}</option> })}
                </select>
                <label className='w3-label'>Property</label>
              </div>
              <div className='w3-section'>
                <ExpenseTypeSlider checked={this.state.isDebit} name='isDebit' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Cash in or cash out</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.amount} name='amount' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Amount</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

export default Expenses;