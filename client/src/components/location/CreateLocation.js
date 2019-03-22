import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { meters2ScreenPixels } from "google-map-react/utils";
import MapMarkerCircle from "../common/MapMarkerCircle";
import TextFieldGroup from "../common/TextFieldGroup";
import RangeInputGroup from "../common/RangeInputGroup";
import { connect } from "react-redux";
import { addProject, fetchProjects } from "../../actions/projectActions";
import { navigate } from "@reach/router";
import isEmpty from "../../validation/is-empty";

class CreateLocation extends Component {
  static defaultProps = {
    center: {
      lat: 47.503081325618005,
      lng: 19.098037212442023
    },
    zoom: 16
  };

  state = {
    width: 10,
    height: 10,
    marker: {
      lat: null,
      lng: null
    },
    radius: 10,
    zoom: 16,
    locationName: "",
    address: ""
  };

  // Using maps API
  apiIsLoaded = (map, maps) => {
    map.addListener("zoom_changed", () => {
      const zoom = map.getZoom();
      this.setMarkerSize(this.state.radius, zoom);
    });

    map.addListener("click", e => {
      this.setState(
        {
          marker: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          },
          zoom: map.getZoom()
        },
        () => this.setMarkerSize(this.state.radius, this.state.zoom)
      );
    });
  };

  // Sets the circle marker on map
  setMarkerSize = (radius = this.state.radius, zoom = this.props.zoom) => {
    // Convert distance to pixels
    const { w, h } = meters2ScreenPixels(
      radius * 2,
      this.state.marker /* marker coords*/,
      zoom /* map zoom*/
    );

    // Set values to state
    this.setState({
      width: w,
      height: h
    });
  };

  onAddLocation = async () => {
    // Data to send to server/db
    const data = {
      latitude: this.state.marker.lat,
      longitude: this.state.marker.lng,
      radius: this.state.radius,
      projectName: this.state.locationName,
      address: this.state.address
    };

    await this.props.addProject(data);
    if (isEmpty(this.props.errors)) {
      console.log("navigate")
      navigate("/locations");
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.setMarkerSize(this.state.radius, this.state.zoom)
    );
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <h1>Új raktár hozzáadása:</h1>
        <p className="lead">
          Kérlek válassz egy pontot a térképen, és add meg alatta a terület
          sugarát!
        </p>
        <div className="map-container mb-3">
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
            bootstrapURLKeys={
              process.env.NODE_ENV === "production"
                ? {
                    key: process.env.REACT_APP_GOOGLE_API_KEY
                  }
                : null
            }
            defaultCenter={this.props.center}
            defaultZoom={this.state.zoom}
          >
            {this.state.marker.lat && (
              <MapMarkerCircle
                width={this.state.width}
                height={this.state.height}
                lat={this.state.marker.lat}
                lng={this.state.marker.lng}
              />
            )}
          </GoogleMapReact>
        </div>
        <div className="form">
          <RangeInputGroup
            label="Sugár (10-1000m):"
            step="10"
            min="10"
            max="1000"
            value={this.state.radius}
            name="radius"
            onChange={this.onChange}
            tooltip
          />
          <TextFieldGroup
            name="locationName"
            text={this.state.locationName}
            onChange={this.onChange}
            placeholder="pl. Telephely"
            label="Helyszín megnevezése:"
            error={errors.projectName}
          />
          <TextFieldGroup
            name="address"
            text={this.state.address}
            onChange={this.onChange}
            placeholder="Pl. 1001 Budapest, Petőfi utca 1."
            label="Cím:"
            error={errors.address}
          />
          <div className="form-group mb-3">
            <button className="btn btn-primary" onClick={this.onAddLocation}>
              <i className="fas fa-plus" /> Hozzáadás
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({projects, errors}) => ({
  projects,
  errors
});

export default connect(
  mapStateToProps,
  { addProject, fetchProjects }
)(CreateLocation);
