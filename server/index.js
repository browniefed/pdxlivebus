require('dotenv').config()

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const fetch = require("isomorphic-fetch");

const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";

async function getVehicles() {
  const res = await fetch(`${VEHICLE_URL}?appID=${process.env.TRIMET_KEY}`);
  const data = await res.json();

  if (data && data.resultSet && data.resultSet.vehicle) {
    const vehicles = resultSet.vehicle.map(vehicle => {
      return {
        routeNumber: vehicle.routeNumber,
        direction: vehicle.direction,
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        type: vehicle.type,
        vehicleID: vehicle.vehicleID,
      };
    });

    io.emit("vehicles_update", vehicles);
  }
}

setInterval(() => getVehicles(), 5000);

app.use(
  cors({
    origin: true,
  }),
);

io.set("origins", "*:*");
app.get("/", (req, res) => res.send(vehicles));

io.on("connection", function(socket) {
  socket.emit("vehicles_update", vehicles);
});

server.listen(3001);
