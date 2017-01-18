import React, { Component } from 'react';

class Active extends Component {
  render() {
    let isActive = this.props.isActive;

    if (isActive === true) {
      return (
        <span className="w3-badge w3-small w3-green">True</span>
      )
    }
    else {
      return (
        <span className="w3-badge w3-small w3-red">False</span>
      )
    }
  }
}

export default Active;