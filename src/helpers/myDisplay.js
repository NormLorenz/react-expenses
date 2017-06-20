import React, { Component } from 'react';

class MyDisplay extends Component {
  render() {
    let _this = this;

    let option = this.props.options.find(function (option) {
      return option.key === _this.props.value;
    });

    if (option) {
      return (
        <span> {option.data.description} </span>
      )
    }

    else {
      return (
        <span> not selected </span>
      )
    }
  }
}

MyDisplay.propTypes = {
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};

export default MyDisplay;