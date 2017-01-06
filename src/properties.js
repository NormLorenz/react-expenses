import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Toggle from 'react-toggle';

class Properties extends Component {

  // https://facebook.github.io/react/docs/lists-and-keys.html
  // http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  // https://facebook.github.io/react/docs/react-component.html

  constructor() {
    super();
    this.state = {

      selectedProperty: null,
      description: 'hoffman road',
      isActive: true,
      operation: 'edit an existing record',

      showModal: false,
      text: '',
      properties: [
        {
          id: 1,
          description: 'browning way',
          isActive: true
        },
        {
          id: 2,
          description: 'garfield bay',
          isActive: false
        },
        {
          id: 3,
          description: 'walnut street',
          isActive: true
        }
      ]
    };

    this.handleNewModal = this.handleNewModal.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleNewModal() {
    this.setState({ showModal: true });
    this.setState({ operation: 'Create a new property' })
  }

  handleEditModal() {
    this.setState({ showModal: true });
    this.setState({ operation: 'Edit an existing property' })
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className='w3-container'>

        <h3>Properties</h3>

        <PropertiesList properties={this.state.properties} handler={this.handleEditModal} />
        <button onClick={this.handleNewModal}>New property</button>

        <ReactModal className='app-modal'
          isOpen={this.state.showModal}
          contentLabel='modal'
          onRequestClose={this.handleCloseModal}>
          <PropertiesForm state={this.state} handler={this.handleCloseModal} />
        </ReactModal>

      </div>
    )
  }
}

class PropertiesList extends Component {

  doThis() {

  }

  render() {

    const divStyle = { height: '400px', overflow: 'scroll' };
    const col1Style = { width: '75%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '10%' };

    let items = this.props.properties.map(property => {
      return (
        <tr key={property.id}>
          <td>{property.description}</td>
          <td><Toggle defaultChecked={property.isActive} disabled={true} /></td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.props.handler}>Edit</button></td>
        </tr>
      );
    });

    return (
      <div style={divStyle}>
        <table className='w3-table-all'>
          <thead>
            <tr>
              <th style={col1Style}>Description</th>
              <th style={col2Style}>Active</th>
              <th style={col3Style}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    )
  }
}

class PropertiesForm extends Component {
  render() {
    return (
      <div className='w3-panel w3-margin'>
        <div className="w3-container w3-blue-grey">
          <h4>{this.props.state.operation}</h4>
        </div>
        <form className='w3-container'>
          <p>
            <input className='w3-input w3-border w3-round' value={this.props.state.description} />
            <label className='w3-label'>Description</label>
          </p>
          <p>
            <Toggle defaultChecked={this.props.state.isActive} /><br />
            <label className="w3-text-teal">Active</label>
          </p>
          <p>
            <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.props.handler}>Cancel</button>
            <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Save</button>
          </p>
        </form>
      </div>
    )
  }
}

export default Properties;