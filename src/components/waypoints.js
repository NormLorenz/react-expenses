import React, { Component } from 'react';
import update from 'immutability-helper';
import WayPoint from './waypoint';

class Waypoints extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wayPoints: props.wayPoints.sort((a, b) => a.index < b.index ? -1 : 1)
    };
  }

  handleClick(command, event) {
    event.preventDefault();

    // https://facebook.github.io/react/docs/update.html

    // commands are up, down, edit, delete, new
    // let command = { action: 'new', index: null, place: null }; // new
    // let command = { action: 'edit', index: 3, place: 'sdfsdfsdf' }; // edit
    // let command = { action: 'up', index: 3, place: null }; // up
    // let command = { action: 'down', index: 3, place: null }; // down
    // let command = { action: 'delete', index: 3, place: null }; // down

    let newState = null;

    switch (command.action) {
      case 'up':
        let a = this.state.wayPoints[command.index];
        let b = this.state.wayPoints[command.index - 1];
        newState = update(this.state.wayPoints, {
          [command.index]: { index: { $set: b.index } },
          [command.index - 1]: { index: { $set: a.index } }
        });
        break;
      case 'down':
        let c = this.state.wayPoints[command.index];
        let d = this.state.wayPoints[command.index + 1];
        newState = update(this.state.wayPoints, {
          [command.index]: { index: { $set: d.index } },
          [command.index + 1]: { index: { $set: c.index } }
        });
        break;
      case 'edit':
        newState = update(this.state.wayPoints, {
          [command.index]: { place: { $set: command.place } }
        });
        break;
      case 'delete':
        newState = update(this.state.wayPoints, {
          $splice: [[command.index, 1]]
        });
        break;
      case 'new':
        let i = this.state.wayPoints.length;
        newState = update(this.state.wayPoints, {
          $push: [{ key: null, index: i, place: null }]
        });
        break;
      default:
        break;
    }

    this.setState({
      wayPoints: newState
        .sort((a, b) => a.index < b.index ? -1 : 1)
        .map((wayPoint, index) => {
          wayPoint.index = index;
          return wayPoint;
        })
    });
  }

  render() {

    const divStyle = { height: '225px', overflow: 'auto' };

    let items = this.state.wayPoints.map(wayPoint => {
      let first = wayPoint.index === 0;
      let last = wayPoint.index === this.state.wayPoints.length - 1;

      return (
        <div key={wayPoint.index}>
          <WayPoint
            first={first}
            last={last}
            wayPoint={wayPoint}
            places={this.props.places} />
        </div>
      );
    });

    return (
      <div className='w3-container w3-border w3-padding-small'>
        <div style={divStyle}>
          {items}
        </div>
        <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' onClick={this.handleClick.bind(this, { action: 'new', index: null, place: null })}>New</button>
      </div>
    )
  }
}

Waypoints.propTypes = {
  wayPoints: React.PropTypes.array.isRequired,
  places: React.PropTypes.array.isRequired
  // onChange: React.PropTypes.func.isRequired
}

export default Waypoints;