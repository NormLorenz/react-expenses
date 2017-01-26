import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import Toggle from 'react-toggle';
import Active from '../helpers/active';

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

class Categories extends Component {

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
      
      categories: [],
    };
  }

  handleOpen(category, operation) {
    if (operation === 'new') {
      this.setState({
        operation: operation,
        operationText: 'Create a new category',
        submitText: 'Save',
        key: '',
        description: '',
        isActive: true
      });
    }
    else if (operation === 'edit') {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing category',
        submitText: 'Save',
        key: category.key,
        description: category.description,
        isActive: category.isActive
      });
    }
    else {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing category',
        submitText: 'Delete',
        key: category.key,
        description: category.description,
        isActive: category.isActive
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

    let category = {
      description: this.state.description,
      isActive: this.state.isActive
    }

    if (this.state.operation === 'new') {
      const categoriesRef = firebase.database().ref('categories');
      categoriesRef.push(category);
    }
    else if (this.state.operation === 'edit') {
      const categoriesRef = firebase.database().ref('categories').child(this.state.key);
      categoriesRef.update(category);
    }
    else {
      const categoriesRef = firebase.database().ref('categories').child(this.state.key);
      categoriesRef.remove();
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

    const categoriesRef = firebase.database().ref('categories').orderByChild('description');
    categoriesRef.on('value', snapshot => {
      let categories = [];
      snapshot.forEach(function (data) {
        let category = {
          key: data.key,
          description: data.val().description,
          isActive: data.val().isActive
        }
        categories.push(category);
      });

      this.setState({
        categories: categories
      });
    });
  }

  render() {
    const divStyle = { height: '372px', overflow: 'scroll' };
    const col1Style = { width: '65%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '20%' };

    let items = this.state.categories.map(category => {
      return (
        <tr key={category.key}>
          <td>{category.description}</td>
          <td><Active isActive={category.isActive} /></td>
          <td><button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, category, 'edit')}>Edit</button>
            &nbsp;<button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, category, 'delete')}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>

        <h3>Categories</h3>

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
        <button className='w3-button w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, null, 'new')}>New category</button>

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

export default Categories;