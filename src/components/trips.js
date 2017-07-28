import React, { Component } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { fetchTaxYear } from '../actions/taxyear';
import { fetchTrips, editTrip, insertTrip, deleteTrip } from '../actions/trips';
import { fetchPlaces } from '../actions/places';

import WayPoints from './waypoints';

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

class Trips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,

      key: null,
      date: null,
      purpose: null,
      wayPoints: [],
      mileage: null,
      taxYear: 0,

      trips: [],
      places: []
    };
  }

  handleOpen(trip, operation) {

    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new trip',
        submitText: 'Save',
        key: null,
        date: '',
        purpose: '',
        wayPoints: null,
        mileage: 123
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing trip',
        submitText: 'Save',
        key: trip.key,
        date: moment(trip.date).format('L'),
        purpose: trip.purpose,
        wayPoints: trip.wayPoints,
        mileage: trip.mileage
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing trip',
        submitText: 'Delete',
        key: trip.key,
        date: moment(trip.date).format('L'),
        purpose: trip.purpose,
        wayPoints: trip.wayPoints,
        mileage: trip.mileage
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

    let trip = {
      key: this.state.key,
      data: {
        date: calculatedDate.toISOString(),
        purpose: this.state.purpose,
        wayPoints: this.state.wayPoints,
        mileage: this.state.mileage,
        taxYear: moment(calculatedDate).year()
      }
    }

    if (this.state.operation === operations.new) {
      this.props.insertTrip(trip);
    }
    else if (this.state.operation === operations.edit) {
      //this.props.editTrip(trip);
    }
    else if (this.state.operation === operations.delete) {
      this.props.deleteTrip(trip);
    }
    console.log('hey', 'handleSubmit');
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
    this.props.fetchTrips();
    this.props.fetchPlaces();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.taxyearObject.isLoaded) {
      this.setState({
        taxYear: newProps.taxyearObject.taxYear
      })
    }
    if (newProps.tripObject.isLoaded) {
      this.setState({
        trips: newProps.tripObject.trips.sort(
          (a, b) => a.date < b.date ? -1 : 1)
      });
    }
    if (newProps.placeObject.isLoaded) {
      this.setState({
        places: newProps.placeObject.places.sort(
          (a, b) => a.description < b.description ? -1 : 1)
      });
    }
  }

  render() {

    const divStyle = { height: '500px', overflow: 'scroll' };
    const col1Style = { width: '15%' };
    const col2Style = { width: '45%' };
    const col3Style = { width: '15%' };
    const col4Style = { width: '25%' };

    let items = this.state.trips.map(trip => {
      return (
        <tr key={trip.key}>
          <td><Moment date={trip.date} format='L' /></td>
          <td>{trip.purpose}</td>
          <td>{trip.mileage}</td>
          <td>
            <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.edit)}>Edit</button>
            &nbsp;<button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.delete)}>Delete</button>
            &nbsp;<button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.delete)}>Map</button>
          </td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Trips for tax year {this.state.taxYear}</h4>

        <div style={divStyle}>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={col1Style}>Date</th>
                <th style={col2Style}>Purpose</th>
                <th style={col3Style}>Mileage</th>
                <th style={col4Style}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New trip</button>

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
                <input className='w3-input w3-border w3-round' value={this.state.purpose} name='purpose' placeholder='enter a purpose' onChange={this.handleInputChange.bind(this)} />
                <label className='w3-label'>Purpose</label>
              </div>
              <div className='w3-section'>
                {/*<WayPoints wayPoints={this.state.wayPoints} places={this.state.places} onChange={this.handleInputChange.bind(this)} />*/}
                <WayPoints wayPoints={this.state.wayPoints} places={this.state.places} />
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-padding-tiny w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

Trips.propTypes = {
};

function mapStateToProps(state) {
  return {
    taxyearObject: state.taxyearObject,
    tripObject: state.tripObject,
    placeObject: state.placeObject
  };
}

export default connect(
  mapStateToProps,
  {
    editTrip: editTrip,
    insertTrip: insertTrip,
    deleteTrip: deleteTrip,
    fetchTaxYear: fetchTaxYear,
    fetchTrips: fetchTrips,
    fetchPlaces: fetchPlaces
  }
)(Trips);