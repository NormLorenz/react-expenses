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

  handleClick(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    this.handleAction({ command: name, index: null, place: null });
  }

  handleAction(action) {

    // https://facebook.github.io/react/docs/update.html

    let newState = null;

    switch (action.command) {
      case 'up':
        let a = this.state.wayPoints[action.index];
        let b = this.state.wayPoints[action.index - 1];
        newState = update(this.state.wayPoints, {
          [action.index]: { index: { $set: b.index } },
          [action.index - 1]: { index: { $set: a.index } }
        });
        break;
      case 'down':
        let c = this.state.wayPoints[action.index];
        let d = this.state.wayPoints[action.index + 1];
        newState = update(this.state.wayPoints, {
          [action.index]: { index: { $set: d.index } },
          [action.index + 1]: { index: { $set: c.index } }
        });
        break;
      case 'edit':
        newState = update(this.state.wayPoints, {
          [action.index]: { place: { $set: action.place } }
        });
        break;
      case 'delete':
        newState = update(this.state.wayPoints, {
          $splice: [[action.index, 1]]
        });
        break;
      case 'new':
        let i = this.state.wayPoints.length;
        newState = update(this.state.wayPoints, {
          $push: [{ key: null, index: i, place: '' }]
        });
        break;
      default:
        break;
    }

    let wayPoints = newState
      .sort((a, b) => a.index < b.index ? -1 : 1)
      .map((wayPoint, index) => {
        wayPoint.index = index;
        return wayPoint;
      });

    this.setState({
      wayPoints: wayPoints
    });

    this.props.onChange(wayPoints);
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
            places={this.props.places}
            onAction={this.handleAction.bind(this)} />
        </div>
      );
    });

    return (
      <div className='w3-container w3-border w3-padding-small'>
        <div style={divStyle}>
          {items}
        </div>
        <button className='w3-button w3-padding-tiny w3-white w3-border w3-border-gray w3-round' name='new' onClick={this.handleClick.bind(this)}>New</button>
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