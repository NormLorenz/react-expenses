// global google

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `168px`,
  height: `28px`,
  marginTop: `10px`,
  padding: `0 8px`,
  borderRadius: `1px`,
  boxShadow: `0 1px 1px rgba(0, 0, 0, 0.3)`,
  fontSize: `10px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const SearchBoxGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder='Search'
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

class SearchBoxComponent extends Component {

  constructor(props) {
    super(props);

    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);

    // start at spokane washington
    this.state = {
      bounds: null,
      center: {
        lat: 47.6587802,
        lng: -117.4260466
      },
      markers: []
    };
  }

  componentWillMount() {
    if (this.props.latitude != null && this.props.longitude != null) {
      this.setState({
        center: {
          lat: this.props.latitude,
          lng: this.props.longitude
        },
        markers: [
          {
            position: {
              lat: this.props.latitude,
              lng: this.props.longitude
            }
          }
        ]
      });
    }
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter()
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });

    const value = {
      formatted_address: places[0].formatted_address,
      latitude: places[0].geometry.location.lat(),
      longitude: places[0].geometry.location.lng()
    }

    this.props.onChange(value);
  }

  render() {
    return (
      <div style={{ width: '293px', height: '250px', border: '1px solid #ccc' }}>
        <SearchBoxGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.center}
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

SearchBoxComponent.propTypes = {
  onChange: React.PropTypes.func,
  longitude: React.PropTypes.number,
  latitude: React.PropTypes.number
};

export default SearchBoxComponent;
