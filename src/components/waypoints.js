import React, { Component } from 'react';
//import WayPoint from './waypoint';

class Waypoints extends Component {

  constructor() {
    super();
    this.state = {
      wayPoints: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState = {
      wayPoints: newProps.wayPoints
    }
  }

  swap(items, from, to) {
    return items.splice(to, 0, items.splice(from, 1)[0]);
  }

  handleOnInsert(object) {

  }

  handleOnChange(object) {
    this.props.onChange(this);
  }

  handleOnUpAction(object) {

  }

  handleOnDownAction(object) {

  }

  handleOnTrashAction(object) {

  }

  render() {

    console.log('another render', this.props.wayPoints);
    console.log('another render', this.state.wayPoints);

    let items = this.props.wayPoints.map(wayPoint => {
      return (
        <div key={wayPoint.key}>
          hello
          {/*<WayPoint
            first={false}
            last={false}
            wayPoint={wayPoint}
            places={this.props.places}
            onChange={this.handleOnChange.bind(this)}
            onUpAction={this.handleOnUpAction.bind(this)}
            onDownAction={this.handleOnDownAction.bind(this)}
            onTrashAction={this.handleOnTrashAction.bind(this)} />*/}
        </div>
      );
    });

    return (
      <div className='w3-section'>
        {items}
        <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleOnInsert.bind(this)}>New</button>
      </div>
    )
  }
}

Waypoints.propTypes = {
  wayPoints: React.PropTypes.array.isRequired,
  places: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default Waypoints;