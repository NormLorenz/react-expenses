import React, { Component } from 'react'

import { connect } from 'react-redux';
import { fetchTaxYear } from '../../actions/taxyear';
import { fetchTrips } from '../../actions/trips';

import Moment from 'react-moment';

class TripReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taxYear: 0,
      trips: [],
      mileageTotal: 0
    };
  }

  componentWillMount() {
    this.props.fetchTaxYear();
    this.props.fetchTrips();
  }

  componentWillReceiveProps(newProps) {

    // taxYear
    if (newProps.taxyearObject.isLoaded) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })

      // trips
      if (newProps.tripObject.isLoaded) {
        let trips = newProps.tripObject.trips
          .sort((a, b) => a.date < b.date ? -1 : 1);

        let mileageTotal = trips
          .reduce((a, b) => a + b.mileage, 0);

        this.setState({
          trips: trips,
          mileageTotal: mileageTotal
        });
      }
    }
  }

  render() {

    let trips = this.state.trips.map(trip => {
      return (
        <tr key={trip.key}>
          <td><Moment date={trip.date} format='L' /></td>
          <td>{trip.purpose}</td>
          <td className='w3-right-align'>{trip.mileage}</td>
          <td></td>
        </tr>
      );
    });

    return (
      <div className='w3-container' >
        <h4>Reports for tax year {this.state.taxYear}</h4>
        <div className='w3-section'>
          <h5>Trips</h5>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Date</th>
                <th style={{ width: '60%' }}>Purpose</th>
                <th style={{ width: '10%' }}>Mileage</th>
                <th style={{ width: '2%' }}></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan='2' className='w3-right-align'><b>Total:</b></td>
                <td className='w3-right-align'>{this.state.mileageTotal}</td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {trips}
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
    tripObject: state.tripObject
  };
}

export default connect(
  mapStateToProps,
  {
    fetchTaxYear: fetchTaxYear,
    fetchTrips: fetchTrips
  }
)(TripReport);