import React, { Component } from 'react';

class TestComponent extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.readMe.text
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
    e.preventDefault()
    this.props.onAddText(this.state.text)
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
            {this.props.readMe.text}
          </div>
          <div className='w3-section'>
            <div>{this.props.readMe.inProgress ? 'wait': 'finished'}</div>
          </div>
        </form>

      </div>
    )
  }
}

TestComponent.propTypes = {
  onAddText: React.PropTypes.func.isRequired,
  readMe: React.PropTypes.object.isRequired
};

export default TestComponent;
