import { NextApiRequest, NextApiResponse } from "next";
import { VehicleResponse } from "../../types";

const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";

const getVehicles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `${VEHICLE_URL}?appID=${process.env.TRIMET_KEY}`
  );
  const data: VehicleResponse = await response.json();

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
    res.json(vehicles);
  }
  res.json([]);
};

export default getVehicles;
