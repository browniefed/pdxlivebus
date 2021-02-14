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
        routeNumber: vehicle.routeNumber,
        direction: vehicle.direction,
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        type: vehicle.type,
        vehicleID: vehicle.vehicleID,
      };
    });

    res.json(vehicles);
  }
};

export default getVehicles;
