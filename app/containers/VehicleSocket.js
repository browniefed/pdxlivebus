import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as vehicleActions from "../actions/vehicles";
import io from "socket.io-client";

class VehicleSocket extends Component {
  componentDidMount() {
    this.socket = io('http://localhost:3001');

    this.socket.on('vehicles_update', (data) => this.props.actions.updateVehicles(data));
  }

  componentWillUnmount() {
    //disconnect scoket
  }

  render() {
    return (
      this.props.children
    )
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators(vehicleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSocket)
