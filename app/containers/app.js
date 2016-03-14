import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import map from "lodash/map";
import VehicleSocket from "./VehicleSocket";

import { divIcon, point } from "leaflet";

import AppCss from "./app.css";

const position = [
  45.5200,
  -122.6716007,
];

const cover = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};

class App extends Component {
  render() {
    const { vehicles } = this.props;

    return (
      <VehicleSocket>
        <div style={cover}>
          <Map center={position} zoom={14} style={cover}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              map(vehicles, (vehicle) => {
                const { routeNumber, type } = vehicle;
                let classes = {
                  [AppCss.marker]: true
                }
                if (type == 'rail') {
                  classes[AppCss[`rail${routeNumber}`]] = true;
                } else if (type == 'bus') {
                  classes[AppCss.bus] = true;
                }

                const icon = divIcon({ className: classnames(classes), html: `<span>${routeNumber}</span>`});
                return (
                  <Marker icon={icon} key={vehicle.vehicleID} position={[vehicle.latitude, vehicle.longitude]}/>
                )
              })
            }

          </Map>
        </div>
      </VehicleSocket>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      vehicles: state.vehicles
    }
}
export default connect(mapStateToProps)(App)
