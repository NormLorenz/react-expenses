import React, { Component } from 'react';
import Modal from 'react-modal';
import * as utilities from './helpers/utilities';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps/lib';

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

const DirectionsExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

const operations = { new: 1, edit: 2, delete: 3, map: 4 };

function validate(date, purpose, wayPoints) {
  // true means invalid, so our conditions got reversed
  let dateObject = moment(date, ['MM-DD', 'MM-DD-YYYY']);
  return {
    date: (dateObject) ? dateObject.isValid() === false : true,
    purpose: (purpose) ? purpose.length === 0 : true,
    wayPoints: (wayPoints) ? Object.keys(wayPoints).length < 2 : true
  };
}

class Trips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showMapModal: false,
      operation: null,
      operationText: null,
      submitText: null,

      key: null,
      date: null,
      purpose: null,
      wayPoints: [],
      mileage: null,
      taxYear: 0,

      field: '',

      trips: [],
      places: [],

      directions: null
    };
  }

  handleBlur = () => () => {
    this.setState({
      field: ''
    });
  }

  handleFocus = (field) => () => {
    this.setState({
      field: field
    });
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
        wayPoints: [],
        mileage: 0,
        showEditModal: true
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
        mileage: trip.mileage,
        showEditModal: true
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
        mileage: trip.mileage,
        showEditModal: true
      });
    }
    else if (operation === operations.map) {
      utilities.getDirections(trip.wayPoints, this.state.places)
        .then((directions) => {
          this.setState({
            mileage: utilities.calculateMileage(directions),
            directions: directions,
            showMapModal: true
          });
        })
        .catch((error) => {
          this.setState({
            mileage: 0,
            directions: null
          });
          console.error(error);
        });
    }

  }

  closeEditModal(event) {
    event.preventDefault();
    this.setState({ showEditModal: false });
  }

  closeMapModal(event) {
    event.preventDefault();
    this.setState({ showMapModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    // wait for a promise to complete
    utilities.getDirections(this.state.wayPoints, this.state.places)
      .then((directions) => {
        this.setState({
          mileage: utilities.calculateMileage(directions)
        });

        this._handleSubmit();
      })
      .catch((error) => {
        this.setState({
          mileage: 0
        });

        this._handleSubmit();
        console.error(error);
      });
  }

  _handleSubmit() {

    let dateObject = utilities.calculateDate(this.state.date, this.state.taxYear);

    let trip = {
      key: this.state.key,
      date: dateObject.date,
      purpose: this.state.purpose,
      wayPoints: this.state.wayPoints,
      mileage: this.state.mileage,
      taxYear: dateObject.taxYear
    };

    if (this.state.operation === operations.new) {
      this.props.insertTrip(trip);
    }
    else if (this.state.operation === operations.edit) {
      this.props.editTrip(trip);
    }
    else if (this.state.operation === operations.delete) {
      this.props.deleteTrip(trip);
    }

    this.setState({ showEditModal: false });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleWayPointsChange(wayPoints) {
    this.setState({
      wayPoints: wayPoints
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
      });
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

    const errors = validate(this.state.date, this.state.purpose, this.state.wayPoints);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    const hasError = (field) => { return errors[field]; };
    const hasFocus = (field) => { return this.state.field === field; };

    const divStyle = { height: '500px', overflow: 'scroll' };
    const col1Style = { width: '15%' };
    const col2Style = { width: '45%' };
    const col3Style = { width: '15%' };
    const col4Style = { width: '25%' };

    let items = this.state.trips.map((trip) => {
      return (
        <tr key={trip.key}>
          <td><Moment date={trip.date} format='L' /></td>
          <td>{trip.purpose}</td>
          <td>{trip.mileage}</td>
          <td>
            <button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.edit)}>Edit</button>
            &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.delete)}>Delete</button>
            &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, trip, operations.map)}>Map</button>
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
        <button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New trip</button>

        <Modal style={modalStyle}
          isOpen={this.state.showEditModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>{this.state.operationText}</h4>
            </div>

            {/* https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component */}

            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <input
                  className={`w3-input w3-border w3-round ${hasFocus('date') ? '' : hasError('date') ? 'w3-border-red' : ''}`}
                  value={this.state.date}
                  name='date'
                  placeholder='mm/dd or mm/dd/yyyy'
                  onChange={this.handleInputChange.bind(this)}
                  onBlur={this.handleBlur('date')}
                  onFocus={this.handleFocus('date')}
                  autoFocus />
                <label className='w3-label'>Date</label>
              </div>
              <div className='w3-section'>
                <input
                  className={`w3-input w3-border w3-round ${hasFocus('purpose') ? '' : hasError('purpose') ? 'w3-border-red' : ''}`}
                  value={this.state.purpose}
                  name='purpose'
                  placeholder='enter a purpose'
                  onChange={this.handleInputChange.bind(this)}
                  onBlur={this.handleBlur('purpose')}
                  onFocus={this.handleFocus('purpose')} />
                <label className='w3-label'>Purpose</label>
              </div>
              <div className='w3-section'>
                <WayPoints
                  className={`w3-container w3-border w3-round w3-padding-small ${hasFocus('wayPoints') ? 'w3-border-cobalt' : hasError('wayPoints') ? 'w3-border-red' : ''}`}
                  wayPoints={this.state.wayPoints}
                  places={this.state.places}
                  onChange={this.handleWayPointsChange.bind(this)}
                  onBlur={this.handleBlur('wayPoints')}
                  onFocus={this.handleFocus('wayPoints')} />
                <label className='w3-label'>Places</label>
              </div>
              <div className='w3-section'>
                <button
                  type='button'
                  className={`w3-button w3-padding-tiny w3-white w3-border w3-round w3-right ${hasFocus('cancel') ? 'w3-border-cobalt' : ''}`}
                  onClick={this.closeEditModal.bind(this)}
                  onBlur={this.handleBlur('cancel')}
                  onFocus={this.handleFocus('cancel')}>Cancel</button>
                <button
                  type='submit'
                  className={`w3-button w3-padding-tiny w3-white w3-border w3-round w3-right w3-margin-right ${hasFocus('save') ? 'w3-border-cobalt' : ''}`}
                  onBlur={this.handleBlur('save')}
                  onFocus={this.handleFocus('save')}
                  disabled={isDisabled}>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

        <Modal style={modalStyle}
          isOpen={this.state.showMapModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>Map Places</h4>
            </div>
            <div style={{ width: '325px', height: '400px' }}>
              <DirectionsExampleGoogleMap
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                directions={this.state.directions}
              />
            </div>
            <div className='w3-light-grey w3-text-grey w3-center'>
              <h5>{this.state.mileage}  miles</h5>
            </div>
            <div className='w3-section'>
              <button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-right' onClick={this.closeMapModal.bind(this)}>Close</button>
            </div>
          </div>
        </Modal>

      </div>
    );
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