import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { VehicleResponse } from "../../types";

const VEHICLE_URL = "http://developer.trimet.org/ws/v2/vehicles";

const upsertVehicles = gql`
  mutation InsertVehicles($vehicles: [vehicles_insert_input!]!) {
    insert_vehicles(
      objects: $vehicles
      on_conflict: {
        constraint: vehicles_pkey
        update_columns: [routeNumber, direction, latitude, longitude, type]
      }
    ) {
      affected_rows
    }
  }
`;

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
});

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

    client.request(upsertVehicles, {
      vehicles,
    });

    setTimeout(() => {
      // invoke here
      res.json({
        success: true,
      });
    }, 5000);
  }
};

export default getVehicles;
