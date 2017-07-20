import React, { Component } from 'react';
// import update from 'react-addons-update';
//import update from 'immutability-helper';
//import WayPoint from './waypoint';

class Waypoints extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wayPoints: props.wayPoints
    };
  }

  componentWillMount() {
    // console.log('hey11', this.props.wayPoints);
    // this.setState = {
    //   wayPoints: this.props.wayPoints
    //[] }
  }

  swap(items, from, to) {
    return items.splice(to, 0, items.splice(from, 1)[0]);
  }

  handleOnInsert(event) {

    console.log('hey22', this.state.wayPoints);
    event.preventDefault();

    let nextOrder = this.state.wayPoints.length + 1;
    let _wayPoints = Object.assign([], this.setState.wayPoints);
    _wayPoints = _wayPoints.push({
      key: null,
      order: nextOrder,
      place: null
    });

    // let _wayPoints = update(this.state.waypoints, {
    //   $push:
    //   [{
    //     key: null,
    //     order: nextOrder,
    //     place: null
    //   }]
    // }
    // );

    this.setState = {
      wayPoints: _wayPoints
    }

    console.log('hey22', this.state.wayPoints);
  }

  handleOnChange(object) {
    //this.props.onChange(this);
  }

  handleOnUpAction(object) {

  }

  handleOnDownAction(object) {

  }

  handleOnTrashAction(object) {

  }

  render() {

    const divStyle = { height: '225px', overflow: 'scroll' };

    let sortedItems = this.state.wayPoints.sort(
      (a, b) => a.order < b.order ? -1 : 1
    );

    console.log('hey33', sortedItems);

    let items = sortedItems.map(wayPoint => {

      let first = wayPoint.order === 1; // disable up button
      let last = wayPoint.order === sortedItems.length; // disable down button

      return (
        <div key={wayPoint.key}>
          hello {wayPoint.key} {wayPoint.order} {wayPoint.place} {first.toString()} {last.toString()} <br /><br />
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

    // let sortedItems = items.sort(
    //       (a, b) => a.order < b.order ? -1 : 1)
    //   });

    return (
      <div className='w3-section'>
        <div style={divStyle}>
          {items}
        </div>
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