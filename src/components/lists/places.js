import React, { Component } from 'react';
import Modal from 'react-modal';
import Toggle from 'react-toggle';
import ActiveDisplay from '../helpers/activeDisplay';
import { connect } from 'react-redux';
import * as actions from '../../actions/places';
import SearchBox from '../helpers/searchbox';
import * as utilities from '../helpers/utilities';
import fixtures from '../../constants/fixtures';

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

function validate(description) {
  // true means invalid, so our conditions got reversed
  return {
    description: (description) ? description.length === 0 : true
  };
}

class Places extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,
      key: null,
      description: null,
      longitude: null,
      latitude: null,
      address: null,
      isActive: false,
      places: [],
      field: ''
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

  handleOpen(place, operation) {
    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new place',
        submitText: 'Save',
        key: null,
        description: '',
        longitude: null,
        latitude: null,
        address: '',
        isActive: true,
        showModal: true
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing place',
        submitText: 'Save',
        key: place.key,
        description: place.data.description,
        longitude: place.data.longitude,
        latitude: place.data.latitude,
        address: place.data.address,
        isActive: place.data.isActive,
        showModal: true
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing place',
        submitText: 'Delete',
        key: place.key,
        description: place.data.description,
        longitude: place.data.longitude,
        latitude: place.data.latitude,
        address: place.data.address,
        isActive: place.data.isActive,
        showModal: true
      });
    }
  }

  handlePrime(event) {
    event.preventDefault();
    let _this = this;

    //let json = JSON.parse('{ "name":"John", "age":30, "cars":[ "Ford", "BMW", "Fiat" ] }');

    if (this.props.placeObject.places.length === 0) {

      fixtures.places.forEach(function (place) {
        let newPlace = {
          key: null,
          data: {
            address: place.address,
            description: place.description,
            isActive: place.isActive,
            latitude: place.latitude,
            longitude: place.longitude
          }
        };

        _this.props.insertPlace(newPlace);
      });

    }
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    let place = {
      key: this.state.key,
      data: {
        description: this.state.description,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        address: this.state.address,
        isActive: this.state.isActive
      }
    };

    if (this.state.operation === operations.new) {
      this.props.insertPlace(place);
    }
    else if (this.state.operation === operations.edit) {
      this.props.editPlace(place);
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

  handleSearchChange(value) {
    this.setState({
      address: value.formatted_address,
      latitude: value.latitude,
      longitude: value.longitude
    });
  }

  componentDidMount() {
    let myInit = {
      method: 'GET'
    };
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=anthonys+cda';

    fetch(url, myInit).then((response) => {
      return response.json();
    }).then((/*data*/) => {
      // data.status);
      // data.results[0].formatted_address);
      // data.results[0].geometry.location.lat);
      // data.results[0].geometry.location.lng);
    });
  }

  componentWillMount() {
    this.props.fetchPlaces();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.placeObject.isLoaded === true) {
      this.setState({
        places: newProps.placeObject.places.sort(
          (a, b) => a.data.description < b.data.description ? -1 : 1)
      });
    }
  }

  render() {

    const errors = validate(this.state.description);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    const hasError = (field) => { return errors[field]; };
    const hasFocus = (field) => { return this.state.field === field; };

    const divStyle = { height: '475px', overflow: 'scroll' };
    const col1Style = { width: '20%' };
    const col2Style = { width: '55%' };
    const col3Style = { width: '10%' };
    const col4Style = { width: '15%' };

    let places = this.state.places.map((place) => {
      return (
        <tr key={place.key}>
          <td>{place.data.description}</td>
          <td>{place.data.address}</td>
          <td><ActiveDisplay isActive={place.data.isActive} /></td>
          <td><button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, place, operations.edit)}>Edit</button>
            &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, place, operations.delete)}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Places</h4>

        <div style={divStyle}>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={col1Style}>Description</th>
                <th style={col2Style}>Address</th>
                <th style={col3Style}>Active</th>
                <th style={col4Style}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {places}
            </tbody>
          </table>
        </div>
        <button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New Place</button>
        &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-margin-top' onClick={this.handlePrime.bind(this)}>Prime Places</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>{this.state.operationText}</h4>
            </div>

            {/* https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component */}

            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <input
                  className={`w3-input w3-border w3-round ${hasFocus('description') ? '' : hasError('description') ? 'w3-border-red' : ''}`}
                  value={this.state.description}
                  name='description'
                  placeholder='enter a friendly name'
                  onChange={this.handleInputChange.bind(this)}
                  onBlur={this.handleBlur('description')}
                  onFocus={this.handleFocus('description')} autoFocus />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <SearchBox latitude={this.state.latitude} longitude={this.state.longitude} onChange={this.handleSearchChange.bind(this)} />
              </div>
              <div className='w3-section'>
                <label className='w3-label'>Address: </label>{utilities.convertTextWithEllipsis(this.state.address, 32)}<br />
                <label className='w3-label'>Longitude: </label>{this.state.longitude}<br />
                <label className='w3-label'>Latitude: </label>{this.state.latitude}
              </div>
              <div className='w3-section'>
                <Toggle checked={this.state.isActive} name='isActive' onChange={this.handleInputChange.bind(this)} /><br />
                <label className='w3-text-teal'>Active</label>
              </div>
              <div className='w3-section'>
                <button
                  type='button'
                  className={`w3-button w3-padding-tiny w3-white w3-border w3-round w3-right ${hasFocus('cancel') ? 'w3-border-cobalt' : ''}`}
                  onClick={this.handleClose.bind(this)}
                  onBlur={this.handleBlur('cancel')}
                  onFocus={this.handleFocus('cancel')}>Cancel</button>
                <button
                  type='submit'
                  className={`w3-button w3-padding-tiny w3-white w3-border w3-round w3-right w3-margin-right ${hasFocus('save') ? 'w3-border-cobalt' : ''}`}
                  onBlur={this.handleBlur('save')}
                  onFocus={this.handleFocus('save')}
                  disabled={isDisabled}>{this.state.submitText}
                </button>
              </div>
            </form>
          </div>
        </Modal>

      </div >
    );
  }
}

Places.propTypes = {
};

function mapStateToProps(state) {
  return {
    placeObject: state.placeObject
  };
}

export default connect(mapStateToProps, actions)(Places);