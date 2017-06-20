import React, { Component } from 'react'
import * as utilities from '../../helpers/utilities';

import MyDisplay from '../../helpers/myDisplay';
import ActiveDisplay from '../../helpers/activeDisplay';

import { connect } from 'react-redux';
import { fetchTaxYear } from '../../actions/taxyear';
import { fetchDonations } from '../../actions/donations';
import { fetchCharities } from '../../actions/charities';

import Moment from 'react-moment';

class DonationReport extends Component {

  constructor() {
    super();
    this.state = {
      taxYear: 0,
      donations: [],
      charities: [],
      donationTotal: 0,
      charityTotal: 0
    };
  }

  // https://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
  calculateSum(donations, key) {
    let filteredDonations = donations.filter((donation) =>
      donation.data.charity === key);
    let sum = filteredDonations.reduce((sum, donation) =>
      sum + donation.data.amount, 0);
    return sum;
  }

  componentWillMount() {
    this.props.fetchTaxYear();
    this.props.fetchDonations();
    this.props.fetchCharities();
  }

  componentWillReceiveProps(newProps) {

    // taxYear
    if (newProps.taxyearObject.isLoaded) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })

      // donations
      if (newProps.donationObject.isLoaded) {
        let donations = newProps.donationObject.donations.sort(
          (a, b) => a.data.date < b.data.date ? -1 : 1);
        let donationTotal = 0;
        // use reduce
        donations.forEach(function (donation) {
          donationTotal += donation.data.amount;
        });

        this.setState({
          donations: donations,
          donationTotal: donationTotal
        });

        // charities
        if (newProps.charityObject.isLoaded) {
          let charities = newProps.charityObject.charities.sort(
            (a, b) => a.data.description < b.data.description ? -1 : 1);
          let charityTotal = 0;
          let _this = this;
          // use reduce
          charities.forEach(function (charity) {
            charity.amount = _this.calculateSum(donations, charity.key);
            charityTotal += charity.amount;
          });

          this.setState({
            charities: charities,
            charityTotal: charityTotal
          });
        }
      }
    }
  }

  render() {

    let donations = this.state.donations.map(donation => {
      return (
        <tr key={donation.key}>
          <td><Moment date={donation.data.date} format='L' /></td>
          <td><MyDisplay options={this.state.charities} value={donation.data.charity} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(donation.data.amount)}</td>
          <td></td>
        </tr>
      );
    });

    let charities = this.state.charities.map(charity => {
      return (
        <tr key={charity.key}>
          <td>{charity.data.description}</td>
          <td><ActiveDisplay isActive={charity.data.isActive} /></td>
          <td className='w3-right-align'>{utilities.convertCentsToDollars(charity.amount)}</td>
          <td></td>
        </tr>
      );
    });

    return (
      <div className='w3-container' >
        <h4>Reports for tax year {this.state.taxYear}</h4>
        <div className='w3-section'>
          <h5>Donations</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Date</th>
                <th style={{ width: '60%' }}>Charity</th>
                <th style={{ width: '10%' }}>Amount</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='2' className='w3-right-align'><b>Total:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.donationTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {donations}
            </tbody>
          </table>
        </div>

        <div className='w3-section'>
          <h5>Charities</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '58%' }}>Description</th>
                <th style={{ width: '40%' }}>Active</th>
                <th className='w3-right-align' style={{ width: '10%' }}>Total</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='2' className='w3-right-align'><b>Totals:</b></td>
                <td className='w3-right-align'>{utilities.convertCentsToDollars(this.state.charityTotal)}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {charities}
            </tbody>
          </table>
        </div>

      </div >
    )
  }
}

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
    fetchTaxYear: fetchTaxYear,
    fetchDonations: fetchDonations,
    fetchCharities: fetchCharities
  }
)(DonationReport);