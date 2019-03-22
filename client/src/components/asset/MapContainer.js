import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import {
  getLastLocation,
  deleteLastLocation
} from '../../actions/locationActions';
import Spinner from '../common/Spinner';
import AssetOnMap from './AssetOnMap';

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 47.5031578,
      lng: 19.09551
    },
    zoom: 16
  };

  componentDidMount = () => {
    this.props.getLastLocation(this.props.assetId);
  };

  renderMap = () => (
    <div className="map-container mb-3">
      <GoogleMapReact
        bootstrapURLKeys={
          {
            // key: 'AIzaSyDo0dLAvyujrm6OoWdiud6wRhyjYd4ynxQ'
          }
        }
        defaultCenter={{
          lat: this.props.location.coords.latitude,
          lng: this.props.location.coords.longitude
        }}
        defaultZoom={this.props.zoom}
      >
        <AssetOnMap
          lat={this.props.location.coords.latitude}
          lng={this.props.location.coords.longitude}
          location={this.props.location}
        />
      </GoogleMapReact>
    </div>
  );

  render() {
    const { isLoading, location } = this.props;
    return isLoading ? (
      <Spinner />
    ) : location ? (
      this.renderMap()
    ) : (
      <div className="mb-3">Ehhez az eszközhöz még nem történt helyadat felvitel.</div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.locations.lastLocation,
  isLoading: state.locations.isLoading
});

const mapDispatchToProps = {
  getLastLocation,
  deleteLastLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
