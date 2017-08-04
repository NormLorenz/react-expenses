import React, { Component } from 'react';
import MySelect from './helpers/mySelect';

class Waypoint extends Component {

  handleClick(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    this.props.onAction({ command: name, index: this.props.wayPoint.index, place: null });
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onAction({ command: name, index: this.props.wayPoint.index, place: value });
  }

  render() {

    let upButton = (this.props.first === true) ?
      <i className='fa fa-chevron-up w3-text-gray w3-almost-medium w3-padding-tiny'></i> :
      <a href='#' name='up' onClick={this.handleClick.bind(this)}>
        <i className='fa fa-chevron-up w3-text-black w3-almost-medium w3-padding-tiny'></i>
      </a>

    let downButton = this.props.last === true ?
      <i className='fa fa-chevron-down w3-text-gray w3-almost-medium w3-padding-tiny'></i> :
      <a href='#' name='down' onClick={this.handleClick.bind(this)}>
        <i className='fa fa-chevron-down w3-text-black w3-almost-medium w3-padding-tiny'></i>
      </a>

    let deleteButton = <a href='#' name='delete' onClick={this.handleClick.bind(this)}>
      <i className='fa fa-trash w3-text-black w3-almost-medium w3-padding-tiny'></i>
    </a >

    return (
      <div className='w3-section' key={this.props.wayPoint.order}>
        <div className='w3-cell'>
          <MySelect className='w3-select w3-border w3-white w3-round' text='select a place'
            options={this.props.places} value={this.props.wayPoint.place}
            name='edit'
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='w3-cell'>
          {upButton}{downButton}{deleteButton}
        </div>
      </div>
    )
  }
}

Waypoint.propTypes = {
  first: React.PropTypes.bool.isRequired,
  last: React.PropTypes.bool.isRequired,
  wayPoint: React.PropTypes.object.isRequired,
  places: React.PropTypes.array.isRequired,
  onAction: React.PropTypes.func.isRequired
}

export default Waypoint;