import React, { Component } from 'react';

class TestComponent extends Component {
  render() {
    return (
      <div className='w3-container'>
        <h4>Test</h4>
        {<button className='w3-button w3-white w3-border w3-border-red w3-round'
          onClick={e => {
            e.preventDefault()
            this.props.onClick()
          }}>Action</button>}
        <div className='w3-container'>
          result = {this.props.text}
        </div>
      </div>
    )
  }
}

TestComponent.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired
};

export default TestComponent;

