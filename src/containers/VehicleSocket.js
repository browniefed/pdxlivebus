import { Component } from "react";
import { connect } from "react-redux";
import { updateVehicles } from "../actions/vehicles";
import io from "socket.io-client";

class VehicleSocket extends Component {
  componentDidMount() {
    this.socket = io("https://pdxlivebus.now.sh/", {
      transports: ["websocket"],
    });
    this.socket.on("vehicles_update", data => this.props.updateVehicles(data));
  }

  componentWillUnmount() {
    //disconnect scoket
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  updateVehicles,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(VehicleSocket);
