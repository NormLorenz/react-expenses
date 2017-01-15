import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Toggle from 'react-toggle';

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

      properties: [],
    };
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
      const propertiesRef = firebase.database().ref('properties').child(this.state.key);
      propertiesRef.remove();
    }

    this.setState({ showModal: false });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleIsActive(event) {
    this.setState({ isActive: event.target.checked });
  }

  componentDidMount() {

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
    const divStyle = { height: '372px', overflow: 'scroll' };
    const col1Style = { width: '70%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '15%' };

    let items = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.description}</td>
          <td><Toggle checked={property.isActive} disabled={true} /></td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, 'edit')}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, 'delete')}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>

        <h3>Properties</h3>

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
              {items}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, null, 'new')}>New Property</button>

        <Modal style={modalStyle}
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className='w3-container w3-blue-grey'>
              <h4>{this.state.operationText}</h4>
            </div>
            <form className='w3-container'>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} onChange={this.handleDescription.bind(this)} />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <Toggle checked={this.state.isActive} onChange={this.handleIsActive.bind(this)} /><br />
                <label className='w3-text-teal'>Active</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right' onClick={this.handleSubmit.bind(this)}>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

export default Properties;