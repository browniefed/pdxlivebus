const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Database = require("@replit/database");
const fetch = require("node-fetch");
const cors = require("cors");

const db = new Database();
const app = express();
const httpserver = http.Server(app);
app.use(cors());
const io = socketio(httpserver, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

httpserver.listen(3000);
const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";

const loadEmitVehicles = async () => {
  const response = await fetch(
    `${VEHICLE_URL}?appID=${process.env.TRIMET_KEY}`
  );
  const data = await response.json();

  if (data && data.resultSet && data.resultSet.vehicle) {
    const vehicles = data.resultSet.vehicle.map((vehicle) => {
      return {
        id: String(vehicle.vehicleID),
        routeNumber: String(vehicle.routeNumber),
        direction: String(vehicle.direction),
        latitude: String(vehicle.latitude),
        longitude: String(vehicle.longitude),
        type: String(vehicle.type),
      };
    });
    db.set("vehicles", vehicles);
    io.emit("vehicles", vehicles);
  }
};

setInterval(() => loadEmitVehicles(), 5000);

io.on("connection", async (socket) => {
  const vehicles = await db.get("vehicles");
  socket.emit("vehicles", vehicles);
});
