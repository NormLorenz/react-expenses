import React, { Component } from 'react';
import Modal from 'react-modal';
import Avatar from '../android_dance.gif';
import moment from 'moment';
import * as utilities from './helpers/utilities';

import { connect } from 'react-redux';
import { fetchTaxYear, editTaxYear } from '../actions/taxyear';
import { fetchExpenses } from '../actions/expenses';
import { fetchProperties } from '../actions/properties';
import { fetchCategories } from '../actions/categories';
import { fetchCharities } from '../actions/charities';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    width: '400px',
    height: '350px',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const cardStyle = {
  width: '400px'
};

const avatarStyle = {
  width: '60px'
};

class Summary extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 0,
      year: null,
      years: [],
      showModal: false,
      categoryRecords: 0,
      propertyRecords: 0,
      charityRecords: 0,
      expenseRecords: 0,
      expenseCredits: 0,
      expenseDebits: 0
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editTaxYear(Number(this.state.taxYear));
    this.setState({ showModal: false });
  }

  handleOpen(event) {
    this.setState({ showModal: true });
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  componentWillMount() {
    this.props.fetchTaxYear();
    this.props.fetchExpenses();
    this.props.fetchProperties();
    this.props.fetchCategories();
    this.props.fetchCharities();
  }

  componentWillReceiveProps(newProps) {

    // taxYear
    if (newProps.taxyearObject.isLoaded) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })
    }

    // expenses
    if (newProps.expenseObject.isLoaded) {
      let expenseRecords = 0;
      let expenseCredits = 0;
      let expenseDebits = 0;

      newProps.expenseObject.expenses.forEach(function (expense) {
        expenseRecords += 1;
        if (expense.data.isDebit === true) {
          expenseDebits += expense.data.amount;
        }
        else {
          expenseCredits += expense.data.amount;
        }
      });

      this.setState({
        expenseRecords: expenseRecords,
        expenseCredits: expenseCredits,
        expenseDebits: expenseDebits
      });
    }

    // properties
    if (newProps.propertyObject.isLoaded) {
      this.setState({
        propertyRecords: newProps.propertyObject.properties.length
      })
    }

    // categories
    if (newProps.categoryObject.isLoaded) {
      this.setState({
        categoryRecords: newProps.categoryObject.categories.length
      })
    }

    // charities
    if (newProps.charityObject.isLoaded) {
      this.setState({
        charityRecords: newProps.charityObject.charities.length
      })
    }
  }

  componentDidMount() {
    let years = [];
    let year = moment().year();
    for (let i = 0; i < 15; i++) {
      years.push(year--);
    }
    this.setState({ years: years.map(i => { return { description: i, key: i } }) });
  }

  render() {
    return (
      <div className='w3-container'>
        <h4>Summary</h4>
        <p><span className='w3-badge w3-blue'>{this.state.categoryRecords}</span> total number of category records</p>
        <p><span className='w3-badge w3-blue'>{this.state.propertyRecords}</span> total number of property records</p>
        <p><span className='w3-badge w3-blue'>{this.state.charityRecords}</span> total number of charity records</p>

        <div className='w3-card-4' style={cardStyle}>
          <header className='w3-container w3-light-grey'>
            <h4>{this.state.taxYear}&nbsp;tax year totals</h4>
          </header>
          <div className='w3-container'>
            <hr />
            <img src={Avatar} alt='avatar' className='w3-left w3-circle w3-margin-right' style={avatarStyle} />
            <p>
              Below are the dollar totals for tax year {this.state.taxYear} only. To view other years, click the
              'change tax year' link below. Cash in: {utilities.convertCentsToDollars(this.state.expenseCredits)},
              cash out: {utilities.convertCentsToDollars(this.state.expenseDebits)}&nbsp;
              and total expense records: {this.state.expenseRecords}.
            </p>
            <br />
          </div>
          <button className='w3-button w3-block w3-blue-grey' onClick={this.handleOpen.bind(this)}>+ change tax year</button>
        </div>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>Change tax year</h4>
            </div>
            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <select className='w3-select w3-border w3-white w3-round' style={{ paddingLeft: '6px' }} name='taxYear' value={this.state.taxYear} onChange={this.handleInputChange.bind(this)} >
                  {this.state.years.map(year => { return <option className='w3-text-grey' key={year.key} value={year.key}>{year.description}</option> })}
                </select>
                <label className='w3-label'>Tax year: also used to set the default year for shortened mm/dd entries</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-padding-tiny w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Save</button>
              </div>
            </form>
          </div>
        </Modal>

      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    taxyearObject: state.taxyearObject,
    expenseObject: state.expenseObject,
    propertyObject: state.propertyObject,
    categoryObject: state.categoryObject,
    charityObject: state.charityObject
  };
}

export default connect(
  mapStateToProps,
  {
    editTaxYear: editTaxYear,
    fetchTaxYear: fetchTaxYear,
    fetchExpenses: fetchExpenses,
    fetchProperties: fetchProperties,
    fetchCategories: fetchCategories,
    fetchCharities: fetchCharities
  }
)(Summary)