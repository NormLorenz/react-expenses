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

      // selectedProperty: null,
      // description: null,
      // isActive: false,
      // operation: null,

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
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        Properties Route
        <PropertiesList properties={this.state.properties} />

        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal isOpen={this.state.showModal}
          contentLabel='modal'
          onRequestClose={this.handleCloseModal}>
          <PropertiesForm props={this.state} />
          <button onClick={this.handleCloseModal}>Close Modal</button>
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
      <div className='w3-panel' style={{ width: 400 }}>
        <div className="w3-container w3-blue-grey">
          <h4>either edit or new peration</h4>
        </div>
        <form className='w3-container'>
          <p>
            <input className='w3-input w3-border w3-round' />
            <label className='w3-label'>description</label>
          </p>
          <p>
            <input className='w3-check' type='checkbox' />
            <label className="w3-validate">active</label>
          </p>
          <p>
            <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right'>Cancel</button>
            <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right'>Save</button>
          </p>
        </form>
      </div>
    )
  }
}

export default Properties;