import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Toggle from 'react-toggle';
import Debit from './debit'
import Select from 'react-select';

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
        date: expense.date,
        description: expense.description,
        category: expense.category,
        property: expense.property,
        isDebit: expense.isDebit,
        amount: expense.amount
      });
    }
    else {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing expense',
        submitText: 'Delete',
        key: expense.key,
        date: expense.date,
        description: expense.description,
        category: expense.category,
        property: expense.property,
        isDebit: expense.isDebit,
        amount: expense.amount
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

    let expense = {
      date: this.state.date,
      description: this.state.description,
      category: this.state.category,
      property: this.state.property,
      isDebit: this.state.isDebit,
      amount: this.state.amount
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

    this.setState({ showModal: false });
  }

  handleDate(event) {
    this.setState({ date: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleProperty(event) {
    this.setState({ property: event.target.value });
  }

  handleIsDebit(event) {
    this.setState({ isDebit: event.target.checked });
  }

  handleAmount(event) {
    this.setState({ amount: event.target.value });
  }

  componentDidMount() {

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

    const expensesRef = firebase.database().ref('expenses').orderByChild('date');
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
        expenses: expenses
      });
    });
  }

  render() {
    const divStyle = { height: '372px', overflow: 'scroll' };
    const col1Style = { width: '20%' };
    const col2Style = { width: '10%' };
    const col3Style = { width: '19%' };
    const col4Style = { width: '15%' };
    const col5Style = { width: '8%' };
    const col6Style = { width: '8%' };
    const col7Style = { width: '17%' };

    let items = this.state.expenses.map(expense => {
      return (
        <tr key={expense.key}>
          <td>{expense.date}</td>
          <td>{expense.description}</td>
          <td>{expense.category}</td>
          <td>{expense.property}</td>
          <td><Debit isDebit={expense.isDebit} /></td>
          <td className='w3-right-align'>{expense.amount}</td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, 'edit')}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, expense, 'delete')}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>

        <h3>Expenses</h3>

        <Select
          //name='form-field-name'
          valueKey='key'
          //value='one'
          labelKey='description'
          options={this.state.properties}
          // onChange={logChange}
          />

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
        <button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, null, 'new')}>New expense</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-container w3-blue-grey'>
              <h4>{this.state.operationText}</h4>
            </div>
            <form className='w3-container'>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.date} onChange={this.handleDate.bind(this)} />
                <label className='w3-text-teal'>Date</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} onChange={this.handleDescription.bind(this)} />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.category} onChange={this.handleCategory.bind(this)} />
                <label className='w3-text-teal'>Category</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.property} onChange={this.handleProperty.bind(this)} />
                <label className='w3-text-teal'>Property</label>
              </div>
              <div className='w3-section'>
                <Toggle checked={this.state.isDebit} onChange={this.handleIsDebit.bind(this)} /><br />
                <label className='w3-text-teal'>Is debit</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.amount} onChange={this.handleAmount.bind(this)} />
                <label className='w3-text-teal'>Amount</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right' onClick={this.handleSubmit.bind(this)}>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

export default Expenses;