import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTextAction, watchTextEvent } from '../actions/readme';

class Readme extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.readme.text
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text !== this.props.readme.text) {
      this.props.onAddText(this.state.text);
    }
  }

  render() {
    return (
      <div className='w3-container'>
        <h4>Test</h4>

        <form className='w3-container' onSubmit={this.handleSubmit.bind(this)} >
          <div className='w3-section'>
            <input type='text' className='w3-input w3-border w3-round' value={this.state.text} name='text' onChange={this.handleInputChange.bind(this)} autoFocus />
            <label className='w3-label'>Text</label>
          </div>
          <div className='w3-section'>
            <button type='submit' className='w3-button w3-white w3-border w3-border-blue w3-round'>Submit</button>
          </div>
          <div className='w3-section'>
            {this.props.readme.text}
          </div>
          <div className='w3-section'>
            <div>{this.props.readme.inProgress ? 'wait' : 'finished'}</div>
          </div>
        </form>

      </div>
    )
  }
}

Readme.propTypes = {
  onAddText: React.PropTypes.func.isRequired,
  readme: React.PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    readme: state.readme
  };
}

function mapDispatchToProps(dispatch) {
  watchTextEvent(dispatch);
  return {
    onAddText: (text) => dispatch(changeTextAction(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Readme);