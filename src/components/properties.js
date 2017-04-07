import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Toggle from 'react-toggle';
import ActiveDisplay from '../helpers/activeDisplay';

//// write actions/properties.js
//// rewrite reducers/properties.js
//// implement propTypes
//// remove this
import NotificationSystem from 'react-notification-system';

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

class Properties extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,
      key: null,
      description: null,
      isActive: false,
      properties: []
    };

    //// remove this
    this._notificationSystem = null;
  }

  //// remove this
  addNotification(event) {
    if (event) event.preventDefault();
    if (this._notificationSystem) {
      this._notificationSystem.addNotification({
        message: 'Record saved',
        level: 'info',
        position: 'br'
      });
    }
  }

  handleOpen(property, operation) {
    if (operation === 'new') {
      this.setState({
        operation: operation,
        operationText: 'Create a new property',
        submitText: 'Save',
        key: '',
        description: '',
        isActive: true
      });
    }
    else if (operation === 'edit') {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing property',
        submitText: 'Save',
        key: property.key,
        description: property.description,
        isActive: property.isActive
      });
    }
    else {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing property',
        submitText: 'Delete',
        key: property.key,
        description: property.description,
        isActive: property.isActive
      });
    }

    this.setState({ showModal: true });
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  //// move to redux
  handleSubmit(event) {
    event.preventDefault();

    let property = {
      description: this.state.description,
      isActive: this.state.isActive
    }

    if (this.state.operation === 'new') {
      const propertiesRef = firebase.database().ref('properties');
      propertiesRef.push(property);
    }
    else if (this.state.operation === 'edit') {
      const propertiesRef = firebase.database().ref('properties').child(this.state.key);
      propertiesRef.update(property);
    }
    else {
      // const propertiesRef = firebase.database().ref('properties').child(this.state.key);
      // propertiesRef.remove();
    }

    // remove this line
    this.addNotification();
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

  componentDidMount() {

    //// also sort when we get properties from store
    //// remove this and get from props
    const propertiesRef = firebase.database().ref('properties').orderByChild('description');
    propertiesRef.on('value', snapshot => {
      let properties = [];
      snapshot.forEach(function (data) {
        let property = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive
        }
        properties.push(property);
      });

      this.setState({
        properties: properties
      });
    });
  }

  render() {
    const divStyle = { height: '475px', overflow: 'scroll' };
    const col1Style = { width: '65%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '20%' };

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.description}</td>
          <td><ActiveDisplay isActive={property.isActive} /></td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, 'edit')}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, 'delete')}>Delete</button></td>
        </tr>
      );
    });

    //// remove notificationsystem
    return (
      <div className='w3-container'>
        <h4>Properties</h4>
        <NotificationSystem ref={n => this._notificationSystem = n} />

        <div style={divStyle}>
          <table className='w3-table-all'>
            <thead>
              <tr>
                <th style={col1Style}>Description</th>
                <th style={col2Style}>Active</th>
                <th style={col3Style}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, 'new')}>New Property</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-card-8 w3-light-grey w3-text-grey w3-center'>
              <h4>{this.state.operationText}</h4>
            </div>
            <form className='w3-container' onSubmit={this.handleSubmit.bind(this)}>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} name='description' onChange={this.handleInputChange.bind(this)} autoFocus />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <Toggle checked={this.state.isActive} name='isActive' onChange={this.handleInputChange.bind(this)} /><br />
                <label className='w3-text-teal'>Active</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

export default Properties;

//// add container logic here