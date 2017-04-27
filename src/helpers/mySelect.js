import React, { Component } from 'react';
import './mySelect.css';
import classnames from 'classnames/bind';

class MySelect extends Component {

  render() {

    const className = classnames(
      'w3-select',
      'w3-border',
      'w3-white',
      'w3-round',
      {
        'placeholder': !this.props.value
      }
    );

    return (
      <select className={className} style={{ paddingLeft: '6px' }} value={this.props.value} onChange={this.props.onChange} >
        <option className='w3-text-grey' key='-1' value=''>{text}</option>
        {this.props.options.map(option => { return <option className='w3-text-grey' key={option.key} value={option.key}>{option.data.description}</option> })}
      </select>
    )
  }
}

CategoryDisplay.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};

export default MySelect;

