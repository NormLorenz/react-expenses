import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

class ActiveDisplay extends Component {
  render() {
    let isActive = this.props.isActive;

    if (isActive === true) {
      return (
        <span className="w3-badge w3-green">true</span>
      );
    }
    else {
      return (
        <span className="w3-badge w3-red">false</span>
      );
    }
  }
}

ActiveDisplay.propTypes = {
  isActive: PropTypes.bool.isRequired
};

export default ActiveDisplay;