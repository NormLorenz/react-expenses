/* global google */
import { default as React, Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps/lib';

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

// add <script src='https://maps.googleapis.com/maps/api/js'></script> to your HTML to provide google.maps reference

export default class DirectionsExample extends Component {

  state = {
    origin: {
      lat: 47.6401709,
      lng: -117.43414530000001
    },
    //new google.maps.LatLng(47.6401709, -117.43414530000001),
    // waypoints: [{
    //   location: {
    //     lat: 48.18256,
    //     lng: -116.4301269
    //   }
    // }],

    waypoints: [
      {
        location: {
          lat: 48.18256,
          lng: -116.4301269
        }
      },
      {
        location: {
          lat: 48.3034107,
          lng: -116.5539827
        }
      }
    ],

    destination: {
      lat: 48.2072406,
      lng: -114.3971781
    },

    //new google.maps.LatLng(48.3034107, -116.5539827),
    directions: null,
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      waypoints: this.state.waypoints,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        });
        console.log(result);
        console.log(result.routes[0].legs[0].distance);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    return (
      <div style={{ width: '400px', height: '400px' }}>
        <DirectionsExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.origin}
          directions={this.state.directions}
        />
      </div>
    );
  }
}