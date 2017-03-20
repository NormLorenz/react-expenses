import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTestAction } from '../actions/test'

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    //invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  console.log('dispatch');
  console.log(dispatch);
  return {
    onClick: () => {
      dispatch(changeTestAction())
    }
  }
}

class TestComponent extends Component {

  render() {
    return (
      <div className='w3-container'>
        <h4>Test</h4>
        <button className='w3-button w3-white w3-border w3-border-red w3-round'
          onClick={e => {
            e.preventDefault()
            onClick()
          }}>Action</button>
          result {this.props.text}
      </div>
    )
  }
}

// TestComponent.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   text: PropTypes.string.isRequired
// }

const TestContainer = connect(mapStateToProps, mapDispatchToProps)(TestComponent);

export default TestContainer;
