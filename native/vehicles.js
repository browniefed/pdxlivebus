import React, { Component } from "react";

if (window.navigator && Object.keys(window.navigator).length == 0 && !window.document) {
  window = Object.assign(window, { navigator: { userAgent: "ReactNative" } });
}

const io = require("socket.io-client/dist/socket.io");

class VehicleSocket extends Component {
  state = {
    vehicles: [],
  };
  componentDidMount() {
    this.socket = io("https://pdxlivebus.now.sh/", {
      transports: ["websocket"],
    });
    this.socket.on("vehicles_update", data =>
      this.setState({
        vehicles: data,
      }),
    );
  }

  render() {
    return this.props.children(this.state.vehicles);
  }
}

export default VehicleSocket;
