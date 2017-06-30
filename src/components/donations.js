import React, { Component } from 'react';
import Modal from 'react-modal';

import * as utilities from '../helpers/utilities';

import { connect } from 'react-redux';
import { fetchTaxYear } from '../actions/taxyear';
import { fetchDonations, editDonation, insertDonation, deleteDonation } from '../actions/donations';
import { fetchCharities } from '../actions/charities';

import MyDisplay from '../helpers/myDisplay';
import MySelect from '../helpers/mySelect';
import fixtures from '../constants/fixtures';

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

class Donations extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,

      key: null,
      date: null,
      charity: null,
      amount: null,

      taxYear: 0,
      donations: [],
      charities: []
    };

  }

  handleOpen(donation, operation) {
    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new donation',
        submitText: 'Save',
        key: null,
        date: '',
        charity: '',
        amount: ''
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing donation',
        submitText: 'Save',
        key: donation.key,
        date: moment(donation.data.date).format('L'),
        charity: donation.data.charity,
        amount: utilities.convertCentsToDollars(donation.data.amount)
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing donation',
        submitText: 'Delete',
        key: donation.key,
        date: moment(donation.data.date).format('L'),
        charity: donation.data.charity,
        amount: utilities.convertCentsToDollars(donation.data.amount)
      });
    }

    this.setState({ showModal: true });
  }

  handlePrime(event) {
    event.preventDefault();
    let _this = this;

    if (this.props.donationObject.donations.length === 0) {

      fixtures.donations.forEach(function (donation) {

        let calculatedDate = moment(donation.date);
    
        let charity = _this.state.charities.find(function (charity) {
          return charity.data.description === donation.charity;
        });

        let newDonation = {
          key: null,
          data: {
            date: calculatedDate.toISOString(),
            charity: charity.key,
            amount: donation.amount * 100,
            taxYear: moment(calculatedDate).year()
          }
        }

        _this.props.insertDonation(newDonation);
      });

    }
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

    let donation = {
      key: this.state.key,
      data: {
        date: calculatedDate.toISOString(),
        charity: this.state.charity,
        amount: calculatedAmount,
        taxYear: moment(calculatedDate).year()
      }
    }

    if (this.state.operation === operations.new) {
      this.props.insertDonation(donation);
    }
    else if (this.state.operation === operations.edit) {
      this.props.editDonation(donation);
    }
    else if (this.state.operation === operations.delete) {
      this.props.deleteDonation(donation);
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

  componentWillMount() {
    this.props.fetchTaxYear();
    this.props.fetchDonations();
    this.props.fetchCharities();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.taxyearObject.isLoaded === true) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })
    }
    if (newProps.charityObject.isLoaded === true) {
      this.setState({
        charities: newProps.charityObject.charities.sort(
          (a, b) => a.data.description < b.data.description ? -1 : 1)
      });
    }
    if (newProps.donationObject.isLoaded === true) {
      this.setState({
        donations: newProps.donationObject.donations.sort(
          (a, b) => a.data.date < b.data.date ? -1 : 1)
      });
    }
  }

  render() {

    const divStyle = { height: '475px', overflow: 'scroll' };
    const col1Style = { width: '25%' };
    const col2Style = { width: '50%' };
    const col3Style = { width: '8%' };
    const col4Style = { width: '17%' };

    let items = this.state.donations.map(donation => {
      return (
        <tr key={donation.key}>
          <td><Moment date={donation.data.date} format='L' /></td>
          <td><MyDisplay options={this.state.charities} value={donation.data.charity} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(donation.data.amount)}</td>
          <td><button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, donation, operations.edit)}>Edit</button>
            &nbsp;<button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, donation, operations.delete)}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Donations for tax year {this.state.taxYear}</h4>

        <div style={divStyle}>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={col1Style}>Date</th>
                <th style={col2Style}>Charity</th>
                <th style={col3Style}>Amount</th>
                <th style={col4Style}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New donation</button>
        &nbsp;<button className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-margin-top' onClick={this.handlePrime.bind(this)}>Prime Donations</button>

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
                <MySelect className='w3-select w3-border w3-white w3-round' name='charity' text='select a charity' options={this.state.charities} value={this.state.charity} onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Charity</label>
              </div>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.amount} name='amount' placeholder='enter an amount' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Amount</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-padding-tiny w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div >
    )
  }
}

Donations.propTypes = {
};

function mapStateToProps(state) {
  return {
    taxyearObject: state.taxyearObject,
    donationObject: state.donationObject,
    charityObject: state.charityObject
  };
}

export default connect(
  mapStateToProps,
  {
    editDonation: editDonation,
    insertDonation: insertDonation,
    deleteDonation: deleteDonation,
    fetchTaxYear: fetchTaxYear,
    fetchDonations: fetchDonations,
    fetchCharities: fetchCharities
  }
)(Donations);