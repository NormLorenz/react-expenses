import React, { Component } from 'react';

class Property extends Component {
  render() {

    let key = this.props.property;
    let property = this.props.properties.find(function (property) {
      return property.key === key;
    });

    if (property) {
      return (
        <span> {property.description} </span>
      )
    }

    else {
      return (
        <span> not selected </span>
      )
    }
  }
}

Property.propTypes = {
  properties: React.PropTypes.array.isRequired
};

export default Property;