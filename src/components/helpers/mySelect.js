import React, { Component } from 'react';
import './mySelect.css';
import classnames from 'classnames/bind';

class MySelect extends Component {

  render() {

    const className = classnames(
      this.props.className,
      {
        'placeholder': !this.props.value
      }
    );

    return (
      <select className={className} style={{ paddingLeft: '6px' }} name={this.props.name} value={this.props.value} onChange={this.props.onChange} >
        <option className='w3-text-grey' key='-1' value=''>{this.props.text}</option>
        {this.props.options.map(option => { return <option className='w3-text-grey' key={option.key} value={option.key}>{option.data.description}</option> })}
      </select>
    )
  }
}

MySelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};

export default MySelect;

