import React, { Component } from 'react';
import Avatar from './android_dance.gif';
import firebase from 'firebase';
//import Moment from 'react-moment';
import moment from 'moment';
import { convertCentsToDollars } from './utilities';

// const modalStyle = {
//   content: {
//     top: '50%',
//     left: '50%',
//     width: '400px',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// };

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
      showModal: false,
      categoryRecords: 0,
      propertyRecords: 0,
      expenseRecords: 0,
      taxYearRecords: 0,
      taxYearCredits: 0,
      taxYearDebits: 0
    };
  }

  componentDidMount() {

    const categoriesRef = firebase.database().ref('categories');
    categoriesRef.once('value', snapshot => {
      this.setState({
        categoryRecords: snapshot.numChildren()
      });
    });

    const propertiesRef = firebase.database().ref('properties');
    propertiesRef.once('value', snapshot => {
      this.setState({
        propertyRecords: snapshot.numChildren()
      });
    });

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

        console.log(taxYear);

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
  }

  render() {
    return (
      <div className='w3-container'>
        <h3>Summary</h3>

        <p><span className='w3-badge w3-blue'>{this.state.categoryRecords}</span> number of category records</p>
        <p><span className='w3-badge w3-blue'>{this.state.propertyRecords}</span> number of property records</p>
        <p><span className='w3-badge w3-blue'>{this.state.expenseRecords}</span> number of expense records</p>

        <div className='w3-card-4' style={cardStyle}>
          <header className='w3-container w3-light-grey'>
            <h3>{this.state.taxYear}&nbsp;tax year totals</h3>
          </header>
          <div className='w3-container'>
            <hr />
            <img src={Avatar} alt='avatar' className='w3-left w3-circle w3-margin-right' style={avatarStyle} />
            <p>
              Total expense records: {this.state.taxYearRecords}, total credits: {convertCentsToDollars(this.state.taxYearCredits)}&nbsp;and total debits: {convertCentsToDollars(this.state.taxYearDebits)}.
            </p>
            <br />
          </div>
          <button className='w3-btn-block w3-blue-grey'>+ change tax year</button>
        </div>
      </div >
    )
  }
}

export default Summary;