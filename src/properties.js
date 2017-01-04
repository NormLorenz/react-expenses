import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Properties extends Component {

  // https://facebook.github.io/react/docs/lists-and-keys.html
  // http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  // https://facebook.github.io/react/docs/react-component.html

  constructor() {
    super();
    this.state = {

      // sortDefinition: ['description:asc'],
      // sortedProperties: Ember.computed.sort('properties', 'sortDefinition'),

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
          isActive: true,
          name: 'Attend a meeting at work'
        },
        {
          id: 2,
          description: 'garfield bay',
          isActive: true,
          name: 'Bring kids to school'
        },
        {
          id: 3,
          description: 'walnut street',
          isActive: true,
          name: 'Go to grocery store'
        }
      ]
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
    console.log('handleOpenModal');
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    console.log('handleCloseModal');
  }

  render() {
    return (
      <div>
        
        <h3>Properties</h3>

        <PropertiesList properties={this.state.properties} />

        <button onClick={this.handleOpenModal}>Trigger Modal</button>
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
  render() {
    return (
      <ul>
        {
          this.props.properties.map(property => {
            return <li key={property.id}>{property.description}</li>
          })
        }
      </ul>
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
            <label className='w3-label'>description</label>
          </p>
          <p>
            <input className='w3-check' type='checkbox' checked={this.props.state.isActive}/>
            <label className="w3-validate">active</label>
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