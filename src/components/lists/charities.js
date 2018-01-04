import React, { Component } from 'react';
import Modal from 'react-modal';
import Toggle from 'react-toggle';
import ActiveDisplay from '../helpers/activeDisplay';
import { connect } from 'react-redux';
import * as actions from '../../actions/charities';
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

class Charities extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      operation: null,
      operationText: null,
      submitText: null,
      key: null,
      description: null,
      isActive: false,
      charities: [],
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

  handleOpen(charity, operation) {
    if (operation === operations.new) {
      this.setState({
        operation: operation,
        operationText: 'Create a new charity',
        submitText: 'Save',
        key: null,
        description: '',
        isActive: true,
        showModal: true
      });
    }
    else if (operation === operations.edit) {
      this.setState({
        operation: operation,
        operationText: 'Edit an existing charity',
        submitText: 'Save',
        key: charity.key,
        description: charity.data.description,
        isActive: charity.data.isActive,
        showModal: true
      });
    }
    else if (operation === operations.delete) {
      this.setState({
        operation: operation,
        operationText: 'Delete an existing charity',
        submitText: 'Delete',
        key: charity.key,
        description: charity.data.description,
        isActive: charity.data.isActive,
        showModal: true
      });
    }
  }

  handlePrime(event) {
    event.preventDefault();
    let _this = this;

    //let json = JSON.parse('{ "name":"John", "age":30, "cars":[ "Ford", "BMW", "Fiat" ] }');

    if (this.props.charityObject.charities.length === 0) {

      fixtures.charities.forEach(function (charity) {

        let newCharity = {
          key: null,
          data: {
            description: charity.description,
            isActive: charity.isActive
          }
        };

        _this.props.insertCharity(newCharity);
      });

    }
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    let charity = {
      key: this.state.key,
      data: {
        description: this.state.description,
        isActive: this.state.isActive
      }
    };

    if (this.state.operation === operations.new) {
      this.props.insertCharity(charity);
    }
    else if (this.state.operation === operations.edit) {
      this.props.editCharity(charity);
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
    this.props.fetchCharities();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.charityObject.isLoaded === true) {
      this.setState({
        charities: newProps.charityObject.charities.sort(
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
    const col1Style = { width: '65%' };
    const col2Style = { width: '15%' };
    const col3Style = { width: '20%' };

    let charities = this.state.charities.map((charity) => {
      return (
        <tr key={charity.key}>
          <td>{charity.data.description}</td>
          <td><ActiveDisplay isActive={charity.data.isActive} /></td>
          <td><button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, charity, operations.edit)}>Edit</button>
            &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOpen.bind(this, charity, operations.delete)}>Delete</button></td>
        </tr>
      );
    });

    return (
      <div className='w3-container'>
        <h4>Charities</h4>

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
              {charities}
            </tbody>
          </table>
        </div>
        <button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round w3-margin-top' onClick={this.handleOpen.bind(this, null, operations.new)}>New Charity</button>
        &nbsp;<button type='button' className='w3-button w3-padding-tiny w3-white w3-border w3-border-red w3-round w3-margin-top' onClick={this.handlePrime.bind(this)}>Prime Charities</button>

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
                  placeholder='enter a description'
                  onChange={this.handleInputChange.bind(this)}
                  onBlur={this.handleBlur('description')}
                  onFocus={this.handleFocus('description')} autoFocus />
                <label className='w3-label'>Description</label>
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

      </div>
    );
  }
}

Charities.propTypes = {
};

function mapStateToProps(state) {
  return {
    charityObject: state.charityObject
  };
}

export default connect(mapStateToProps, actions)(Charities);