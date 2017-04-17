import React, { Component } from 'react';

class CategoryDisplay extends Component {
  render() {

    let key = this.props.category;
    let category = this.props.categories.find(function (category) {
      return category.key === key;
    });

    if (category) {
      return (
        <span> {category.data.description} </span>
      )
    }

    else {
      return (
        <span> not selected </span>
      )
    }
  }
}

CategoryDisplay.propTypes = {
  categories: React.PropTypes.array.isRequired
};

export default CategoryDisplay;