import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { MapView } from "expo";

const AnimatedRegion = MapView.AnimatedRegion;

class VehicleMarker extends Component {
  state = {
    coordinate: new AnimatedRegion({
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    }),
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      `${prevProps.latitude}` !== `${this.props.latitude}` ||
      `${prevProps.longitude}` !== `${this.props.longitude}`
    ) {
      if (Platform.OS === "android") {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(
            {
              latitude: this.props.latitude,
              longitude: this.props.longitude,
            },
            duration,
          );
        }
      } else {
        this.state.coordinate
          .timing({
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            duration: 5000,
          })
          .start();
      }
    }
  };
  render() {
    const { routeNumber, vehicleID, coordinate, type } = this.props;
    let style;

    if (type == "rail") {
      style = styles[`rail${routeNumber}`];
    } else {
      style = styles.bus;
    }

    return (
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        ref={marker => {
          this.marker = marker;
        }}
      >
        <View style={[styles.marker, style]}>
          <Text style={styles.text}>{routeNumber}</Text>
        </View>
      </MapView.Marker.Animated>
    );
  }
}

export default VehicleMarker;

const styles = StyleSheet.create({
  marker: {
    borderWidth: 1,
    borderColor: "#FFF",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
  },
  bus: {
    backgroundColor: "#333",
  },
  rail90: {
    backgroundColor: "#D11241",
  },
  rail100: {
    backgroundColor: "#0069AA",
  },
  rail190: {
    backgroundColor: "#FFC423",
  },
  rail200: {
    backgroundColor: "#008752",
  },
  rail290: {
    backgroundColor: "#D25D13",
  },
});
