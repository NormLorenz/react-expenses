import React, { Component } from 'react';
import ReactModal from 'react-modal';
import firebase from 'firebase';
import Toggle from 'react-toggle';

class Properties extends Component {

  constructor() {
    super();
    this.state = {

      showModal: false,
      operation: '',
      id: 0,
      description: '',
      isActive: true,
      propertiesRef: firebase.database().ref('properties'),
      properties: [],
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleIsActive = this.handleIsActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen(event) {
    if (event == null) {
      this.setState({
        operation: 'edit a new property',
        id: 0,
        description: '',
        isActive: true
      });
    } else {
      this.setState({
        operation: 'edit an existing property',
        id: event.id,
        description: event.description,
        isActive: event.isActive
      });
    }
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleSave() {
    let newProperty = {
      description: this.state.description,
      isActive: this.state.isActive
    }

    this.state.propertiesRef.push(newProperty);
    this.setState({ showModal: false });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleIsActive(event) {
    this.setState({ isActive: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();

    // stuff from the save handler
    // https://www.youtube.com/watch?v=yOu_PUAOtP0&list=PLillGF-RfqbbKWfm3Y_RF57dNGsHnkYqO&index=7
    // at 5.53 minutes
  }

  componentDidMount() {
    // once, item added or something
    this.state.propertiesRef.on('value', snapshot => {

      let properties = [];
      snapshot.forEach(function (data) {
        let property = {
          id: data.key,
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

    const divStyle = { height: '400px', overflow: 'scroll' };
    const col1Style = { width: '75%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '10%' };

    let items = this.state.properties.map(property => {
      return (
        <tr key={property.id}>
          <td>{property.description}</td>
          <td><Toggle defaultChecked={property.isActive} disabled={true} /></td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={() => this.handleOpen(property)}>Edit</button></td>
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
                <th style={col3Style}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
        <button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={() => this.handleOpen(null)}>New Property</button>

        <ReactModal className='app-modal'
          isOpen={this.state.showModal}
          contentLabel='modal'>
          <div className='w3-margin'>
            <div className="w3-container w3-blue-grey">
              <h4>{this.state.operation}</h4>
            </div>
            <form className='w3-container'>
              <div className='w3-section'>
                <input className='w3-input w3-border w3-round' value={this.state.description} onChange={this.handleDescription} />
                <label className='w3-label'>Description</label>
              </div>
              <div className='w3-section'>
                <Toggle checked={this.state.isActive} onChange={this.handleIsActive} /><br />
                <label className="w3-text-teal">Active</label>
              </div>
              <div className='w3-section'>
                <button className='w3-button w3-white w3-border w3-border-red w3-round w3-right' onClick={this.handleClose}>Cancel</button>
                <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-right w3-margin-right' onClick={this.handleSave}>Save</button>
              </div>
            </form>
          </div>
        </ReactModal>

      </div>
    )
  }
}

export default Properties;