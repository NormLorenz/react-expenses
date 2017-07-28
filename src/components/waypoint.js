import React, { Component } from 'react';
import MySelect from './helpers/mySelect';

class Waypoint extends Component {

  handleOnChange() {
  }

  render() {

    // rewrite this or that not the way we have it now

    let upButton = <i className='fa fa-chevron-up w3-text-gray w3-almost-medium w3-padding-tiny'></i>;
    if (this.props.first !== true) {
      upButton = <a href='#'>
        <i className='fa fa-chevron-up w3-text-black w3-almost-medium w3-padding-tiny'></i>
      </a>;
    }

    let downButton = <i className='fa fa-chevron-down w3-text-gray w3-almost-medium w3-padding-tiny'></i>;
    if (this.props.last !== true) {
      downButton = <a href='#'>
        <i className='fa fa-chevron-down w3-text-black w3-almost-medium w3-padding-tiny'></i>
      </a>;
    }

    let trashButton = <a href='#'>
      <i className='fa fa-trash w3-text-black w3-almost-medium w3-padding-tiny'></i>
    </a>;

    return (
      <div className='w3-section' key={this.props.wayPoint.order}>
        <div className='w3-cell'>
          <MySelect className='w3-select w3-border w3-white w3-round' text='select a place'
            options={this.props.places} value={this.props.wayPoint.place}
            name='place'
            onChange={this.handleOnChange.bind} />
        </div>
        <div className='w3-cell'>
          {upButton}{downButton}{trashButton}
        </div>
      </div>
    )
  }
}

Waypoint.propTypes = {
  first: React.PropTypes.bool.isRequired,
  last: React.PropTypes.bool.isRequired,
  wayPoint: React.PropTypes.object.isRequired,
  places: React.PropTypes.array.isRequired //,
  // onChange: React.PropTypes.func.isRequired,
  // onUpAction: React.PropTypes.func.isRequired,
  // onDownAction: React.PropTypes.func.isRequired,
  // onTrashAction: React.PropTypes.func.isRequired
}

export default Waypoint;