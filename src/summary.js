import React, { Component } from 'react';
import Avatar from './android_dance.gif';

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
      categoryRecords: 24,
      propertyRecords: 46,
      expenseRecords: 313,
      taxYearRecords: 34,
      taxYearCredits: '$4,123.04',
      taxYearDebits: '$1,003.23'
    };
  }

  render() {
    return (
      <div className='w3-container'>
        <h3>Summary</h3>

        <p><span className='w3-badge w3-blue'>23</span> number of category records</p>
        <p><span className='w3-badge w3-blue'>45</span> number of property records</p>
        <p><span className='w3-badge w3-blue'>312</span> number of expense records</p>

        <div className='w3-card-4' style={cardStyle}>
          <header className='w3-container w3-light-grey'>
            <h3>2015 tax year totals</h3>
          </header>
          <div className='w3-container'>
            <hr />
            <img src={Avatar} alt='avatar' className='w3-left w3-circle w3-margin-right' style={avatarStyle} />
            <p>
              Total expense records: {this.state.taxYearRecords}, total credits: {this.state.taxYearCredits} and total debits: {this.state.taxYearCredits}.
            </p>
            <br />
          </div>
          <button className='w3-btn-block w3-blue-grey'>+ change tax year</button>
        </div>
      </div>
    )
  }
}

export default Summary;