import React, { Component } from 'react';

class Category extends Component {
  render() {

    let key = this.props.category;
    let category = this.props.categories.find(function (category) {
      return category.key === key;
    });

    if (category) {
      return (
        <span> {category.description} </span>
      )
    }

    else {
      return (
        <span> not selected </span>
      )
    }
  }
}

Category.propTypes = {
  categories: React.PropTypes.array.isRequired
};

export default Category;