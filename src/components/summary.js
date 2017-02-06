import React, { Component } from 'react';
import Modal from 'react-modal';
import Avatar from '../android_dance.gif';
import firebase from 'firebase';
//import Moment from 'react-moment';
import moment from 'moment';
import Select from 'react-select';

import { convertCentsToDollars } from '../helpers/utilities';

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
      taxYear: 1776,
      year: null,
      years: [],
      showModal: false,
      categoryRecords: 0,
      propertyRecords: 0,
      expenseRecords: 0,
      taxYearRecords: 0,
      taxYearCredits: 0,
      taxYearDebits: 0
    };
  }

  handleTaxYear(event) {
    //this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleOpen(event) {
    this.setState({ showModal: true });
    console.log(this.state.years);
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  componentDidMount() {

    let years = [];
    let year = moment().year();
    for (let i = 0; i < 15; i++) {
      years.push(year--);
    }
    this.setState({ years: years.map(i => { return { label: i, value: i } }) });

    const rootRef = firebase.database().ref();
    const taxYearRef = rootRef.child('taxYear');
    taxYearRef.once('value', snapshot => {
      this.setState({
        taxYear: snapshot.val()
      })

      const expensesRef = firebase.database().ref('expenses');
      expensesRef.once('value', snapshot => {

        let expenseRecords = 0;
        let taxYear = this.state.taxYear;
        let taxYearRecords = 0;
        let taxYearCredits = 0;
        let taxYearDebits = 0;

        snapshot.forEach(function (data) {
          expenseRecords += 1;
          if (moment(data.val().date).year() === taxYear) {
            taxYearRecords += 1;
            if (data.val().isDebit === true) {
              taxYearDebits += Number(data.val().amount);
            }
            else {
              taxYearCredits += Number(data.val().amount);
            }
          }
        });

        this.setState({
          expenseRecords: expenseRecords,
          taxYearRecords: taxYearRecords,
          taxYearCredits: taxYearCredits,
          taxYearDebits: taxYearDebits
        })
      })

    });

    const propertiesRef = firebase.database().ref('properties');
    propertiesRef.once('value', snapshot => {
      this.setState({
        propertyRecords: snapshot.numChildren()
      });
    });

    const categoriesRef = firebase.database().ref('categories');
    categoriesRef.once('value', snapshot => {
      this.setState({
        categoryRecords: snapshot.numChildren()
      });
    });

  }

  render() {
    return (
      <div className='w3-container'>
        <h4>Summary</h4>

        <p><span className='w3-badge w3-blue'>{this.state.categoryRecords}</span> number of category records</p>
        <p><span className='w3-badge w3-blue'>{this.state.propertyRecords}</span> number of property records</p>
        <p><span className='w3-badge w3-blue'>{this.state.expenseRecords}</span> number of expense records</p>

        <div className='w3-card-4' style={cardStyle}>
          <header className='w3-container w3-light-grey'>
            <h4>{this.state.taxYear}&nbsp;tax year totals</h4>
          </header>
          <div className='w3-container'>
            <hr />
            <img src={Avatar} alt='avatar' className='w3-left w3-circle w3-margin-right' style={avatarStyle} />
            <p>
              Total expense records: {this.state.taxYearRecords}, total credits: {convertCentsToDollars(this.state.taxYearCredits)}&nbsp;and total debits: {convertCentsToDollars(this.state.taxYearDebits)}.
            </p>
            <br />
          </div>
          <button className='w3-btn-block w3-blue-grey' onClick={this.handleOpen.bind(this)}>+ change tax year</button>
        </div>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>Change the tax year</h4>
            </div>
            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <Select value={this.state.taxYear} options={this.state.years} onChange={this.handleTaxYear.bind(this)} />
                <label className='w3-label'>Tax year: also used to set the default year for shortened mm/dd entries</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Save</button>
              </div>
            </form>
          </div>
        </Modal>

      </div >
    )
  }
}

export default Summary;