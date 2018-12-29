import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Map, Marker, TileLayer } from "react-leaflet";
import map from "lodash/map";
import VehicleSocket from "./VehicleSocket";

import { divIcon } from "leaflet";

const position = [45.52, -122.6716007];

const cover = { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 };

const urlParams = new URLSearchParams(window.location.search);

class App extends Component {
  state = {
    zoom: urlParams.get("zoom") || 14,
    position: urlParams.get("position") ? urlParams.get("position").split(",") : position,
  };
  render() {
    const { vehicles } = this.props;

    return (
      <VehicleSocket>
        <div style={cover}>
          <Map center={this.state.position} zoom={this.state.zoom} style={cover}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {map(vehicles, vehicle => {
              const { routeNumber, type } = vehicle;
              let classes = {
                ["marker"]: true,
              };
              if (type === "rail") {
                classes[`rail${routeNumber}`] = true;
              } else if (type === "bus") {
                classes["bus"] = true;
              }

              const icon = divIcon({
                className: classnames(classes),
                html: `<span>${routeNumber}</span>`,
              });

              return (
                <Marker
                  icon={icon}
                  key={vehicle.vehicleID}
                  position={[vehicle.latitude, vehicle.longitude]}
                />
              );
            })}
          </Map>
        </div>
      </VehicleSocket>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles,
  };
};
export default connect(mapStateToProps)(App);
