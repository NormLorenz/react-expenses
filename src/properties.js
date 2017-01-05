import React, { Component } from 'react';
import ReactModal from 'react-modal';

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

    const divStyle = {
      height: '400px',
      overflow: 'scroll'
    };

    const col1Style = {
      width: '75%'
    };

    const col2Style = {
      width: '15%'
    };

    const col3Style = {
      width: '10%'
    };

    let items = this.props.properties.map(property => {
      return (
        <tr key={property.id}>
          <td style={col1Style}>{property.description}</td>
          <td style={col2Style}><input className='w3-check' type='checkbox' checked={property.isActive} /></td>
          <td style={col3Style}><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.props.handler}>Edit</button></td>
        </tr>
      );
    });

    return (
      <div style={divStyle}>
        <table className='w3-table-all'>
          <tbody>
            <tr>
              <th>Description</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
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
            <input className='w3-check' type='checkbox' checked={this.props.state.isActive} />
            <label className="w3-validate"> Active</label>
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