import { Component } from "react";
import io from "socket.io-client";

class VehicleSocket extends Component {
  state = {
    vehicles: [],
  };
  componentDidMount() {
    this.socket = io(process.env.SERVER, {
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
