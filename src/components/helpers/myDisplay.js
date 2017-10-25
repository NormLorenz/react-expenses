import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

class MyDisplay extends Component {
  render() {
    let _this = this;

    let option = this.props.options.find(function (option) {
      return option.key === _this.props.value;
    });

    if (option) {
      return (
        <span> {option.data.description} </span>
      );
    }

    else {
      return (
        <span> not selected </span>
      );
    }
  }
}

MyDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default MyDisplay;