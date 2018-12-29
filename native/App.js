import React, { Component } from "react";
import { MapView } from "expo";
import { StyleSheet, View } from "react-native";

import VehicleSocket from "./vehicles";
import VehicleMarker from "./marker";

const position = {
  lat: 45.52,
  lng: -122.6716007,
};

export default class App extends Component {
  render() {
    return (
      <VehicleSocket>
        {vehicles => {

          return (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: position.lat,
                  longitude: position.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {vehicles.map(vehicle => {
                  const { routeNumber, type, latitude, longitude, vehicleID } = vehicle;

                  return (
                    <VehicleMarker
                      key={vehicleID}
                      latitude={latitude}
                      longitude={longitude}
                      routeNumber={routeNumber}
                      type={type}
                    />
                  );
                })}
              </MapView>
            </View>
          );
        }}
      </VehicleSocket>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
