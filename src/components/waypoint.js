import React, { Component } from 'react';

class Waypoint extends Component {

  render() {

    let upButton = <i className='fa fa-chevron-up w3-text-gray w3-large w3-padding-tiny'></i>;
    if (this.props.first !== true) {
      upButton = <a href='#' onClick={this.props.onUpAction.bind(this)}>
        <i className='fa fa-chevron-up w3-text-black w3-large w3-padding-tiny'></i>
      </a>;
    }

    let downButton = <i className='fa fa-chevron-down w3-text-gray w3-large w3-padding-tiny'></i>;
    if (this.props.last !== true) {
      downButton = <a href='#' onClick={this.props.onDownAction.bind(this)}>
        <i className='fa fa-chevron-down w3-text-black w3-large w3-padding-tiny'></i>
      </a>;
    }

    let trashButton = <a href='#' onClick={this.props.onTrashAction.bind(this)}>
      <i className='fa fa-trash w3-text-black w3-large w3-padding-tiny'></i>
    </a>;

    return (
      <div className='w3-section' key={this.props.wayPoint.order}>
        <MySelect className='w3-select w3-border w3-white w3-round' text='select a place'
          options={this.props.places} value={this.props.wayPoint.place}
          onChange={this.props.onChange.bind(this)} />
        {upButton}{downButton}{trashButton}
      </div>
    )
  }
}

Waypoint.propTypes = {
  first: React.PropTypes.bool.isRequired,
  last: React.propTypes.bool.isRequired,
  wayPoint: React.propTypes.object.isRequired,
  places: React.propTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onUpAction: React.PropTypes.func.isRequired,
  onDownAction: React.PropTypes.func.isRequired,
  onTrashAction: React.PropTypes.func.isRequired
}

export default Waypoint;