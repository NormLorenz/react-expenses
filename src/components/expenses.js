import React, { Component } from 'react';
import Modal from 'react-modal';

import PropertyDisplay from '../helpers/propertyDisplay';
import CategoryDisplay from '../helpers/categoryDisplay';
import ExpenseTypeSlider from '../helpers/expenseTypeSlider';
import ExpenseTypeDisplay from '../helpers/expenseTypeDisplay';
import * as utilities from '../helpers/utilities';

import { connect } from 'react-redux';
import { fetchTaxYear } from '../actions/taxyear';
import { editExpense, insertExpense, deleteExpense, fetchExpenses } from '../actions/expenses';
import { fetchProperties } from '../actions/properties';
import { fetchCategories } from '../actions/categories';

import MySelect from '../helpers/mySelect';

import Moment from 'react-moment';
import moment from 'moment';

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

const operations = { new: 1, edit: 2, delete: 3 };

class Expenses extends Component {

  constructor() {
    super();
    this.state = {
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

      taxYear: 0,
      expenses: [],
      properties: [],
      categories: []
    };

  }

  handleOpen(expense, operation) {
    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new expense',
        submitText: 'Save',
        key: null,
        date: '',
        description: '',
        category: '',
        property: '',
        isDebit: true,
        amount: ''
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing expense',
        submitText: 'Save',
        key: expense.key,
        date: moment(expense.data.date).format('L'),
        description: expense.data.description,
        category: expense.data.category,
        property: expense.data.property,
        isDebit: expense.data.isDebit,
        amount: utilities.convertCentsToDollars(expense.data.amount)
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing expense',
        submitText: 'Delete',
        key: expense.key,
        date: moment(expense.data.date).format('L'),
        description: expense.data.description,
        category: expense.data.category,
        property: expense.data.property,
        isDebit: expense.data.isDebit,
        amount: utilities.convertCentsToDollars(expense.data.amount)
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
      key: this.state.key,
      data: {
        date: calculatedDate.toISOString(),
        description: this.state.description,
        category: this.state.category,
        property: this.state.property,
        isDebit: this.state.isDebit,
        amount: calculatedAmount,
        taxYear: moment(calculatedDate).year()
      }
    }

    if (this.state.operation === operations.new) {
      this.props.onInsertExpense(expense);
    }
    else if (this.state.operation === operations.edit) {
      this.props.onEditExpense(expense);
    }
    else if (this.state.operation === operations.delete) {
      this.props.onDeleteExpense(expense);
    }

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

  componentWillReceiveProps(newProps) {
    if (newProps.taxyearObject.taxYear) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })
    }
    if (newProps.expenseObject.expenses) {
      this.setState({
        expenses: newProps.expenseObject.expenses.sort(
          (a, b) => a.data.date < b.data.date ? -1 : 1)
      });
    }
    if (newProps.propertyObject.properties) {
      this.setState({
        properties: newProps.propertyObject.properties.sort(
          (a, b) => a.data.description < b.data.description ? -1 : 1)
      });
    }
    if (newProps.categoryObject.categories) {
      this.setState({
        categories: newProps.categoryObject.categories.sort(
          (a, b) => a.data.description < b.data.description ? -1 : 1)
      });
    }
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
          <td><Moment date={expense.data.date} format='L' /></td>
          <td>{expense.data.description}</td>
          <td><CategoryDisplay categories={this.state.categories} category={expense.data.category} /></td>
          <td><PropertyDisplay properties={this.state.properties} property={expense.data.property} /></td>
          <td><ExpenseTypeDisplay isDebit={expense.data.isDebit} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(expense.data.amount)}</td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, operations.edit)}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, operations.delete)}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Expenses for tax year {this.state.taxYear}</h4>

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
        <button className='w3-button w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New expense</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>{this.state.operationText}</h4>
            </div>
            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.date} name='date' placeholder='mm/dd or mm/dd/yyyy' onChange={this.handleInputChange.bind(this)} autoFocus />
                <label className='w3-label'>Date</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} name='description' placeholder='enter a description' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <MySelect className='w3-select w3-border w3-white w3-round' name='category' text='select a category' options={this.state.categories} value={this.state.category} onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Category</label>
              </div>
              <div className='w3-section'>
                <MySelect className='w3-select w3-border w3-white w3-round' name='property' text='select a property' options={this.state.properties} value={this.state.property} onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Property</label>
              </div>
              <div className='w3-section'>
                <ExpenseTypeSlider checked={this.state.isDebit} name='isDebit' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Type</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.amount} name='amount' placeholder='enter an amount' onChange={this.handleInputChange.bind(this)} />
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

Expenses.propTypes = {
  onEditExpense: React.PropTypes.func.isRequired,
  onInsertExpense: React.PropTypes.func.isRequired,
  onDeleteExpense: React.PropTypes.func.isRequired,
  taxyearObject: React.PropTypes.object.isRequired,
  expenseObject: React.PropTypes.object.isRequired,
  propertyObject: React.PropTypes.object.isRequired,
  categoryObject: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    taxyearObject: state.taxyearObject,
    expenseObject: state.expenseObject,
    propertyObject: state.propertyObject,
    categoryObject: state.categoryObject
  };
}

function mapDispatchToProps(dispatch) {
  fetchTaxYear(dispatch);
  fetchExpenses(dispatch);
  fetchProperties(dispatch);
  fetchCategories(dispatch);
  return {
    onEditExpense: (expense) => dispatch(editExpense(expense)),
    onInsertExpense: (expense) => dispatch(insertExpense(expense)),
    onDeleteExpense: (expense) => dispatch(deleteExpense(expense))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);