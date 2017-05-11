import React, { Component } from 'react';
import Modal from 'react-modal';
import Toggle from 'react-toggle';
import ActiveDisplay from '../helpers/activeDisplay';
import { connect } from 'react-redux';
import * as actions from '../actions/properties';

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
  }

  handleOpen(property, operation) {
    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new property',
        submitText: 'Save',
        key: null,
        description: '',
        isActive: true
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing property',
        submitText: 'Save',
        key: property.key,
        description: property.data.description,
        isActive: property.data.isActive
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing property',
        submitText: 'Delete',
        key: property.key,
        description: property.data.description,
        isActive: property.data.isActive
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
      key: this.state.key,
      data: {
        description: this.state.description,
        isActive: this.state.isActive
      }
    }

    if (this.state.operation === operations.new) {
      this.props.insertProperty(property);
    }
    else if (this.state.operation === operations.edit) {
      this.props.editProperty(property);
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

  componentWillMount() {
    this.props.fetchProperties();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.propertyObject.isLoaded === true) {
      this.setState({
        properties: newProps.propertyObject.properties.sort(
          (a, b) => a.data.description < b.data.description ? -1 : 1)
      });
    }
  }

  render() {
    const divStyle = { height: '475px', overflow: 'scroll' };
    const col1Style = { width: '65%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '20%' };

    let properties = this.state.properties.map(property => {
      return (
        <tr key={property.key}>
          <td>{property.data.description}</td>
          <td><ActiveDisplay isActive={property.data.isActive} /></td>
          <td><button className='w3-button w3-padding-small w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, operations.edit)}>Edit</button>
            &nbsp;<button className='w3-button w3-padding-small w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, property, operations.delete)}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Properties</h4>

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
        <button className='w3-button w3-padding-small w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New Property</button>

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
                <button className='w3-button w3-padding-small w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose.bind(this)}>Cancel</button>
                <button type='submit' className='w3-button w3-padding-small w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>{this.state.submitText}</button>
              </div>
            </form>
          </div>
        </Modal>

      </div>
    )
  }
}

Properties.propTypes = {
};

function mapStateToProps(state) {
  return {
    propertyObject: state.propertyObject
  };
}

export default connect(mapStateToProps, actions)(Properties);