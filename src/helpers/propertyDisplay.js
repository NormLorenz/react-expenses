import React, { Component } from 'react';

class PropertyDisplay extends Component {
  render() {

    let key = this.props.property;
    let property = this.props.properties.find(function (property) {
      return property.key === key;
    });

    if (property) {
      return (
        <span> {property.data.description} </span>
      )
    }

    else {
      return (
        <span> not selected </span>
      )
    }
  }
}

PropertyDisplay.propTypes = {
  properties: React.PropTypes.array.isRequired
};

export default PropertyDisplay;