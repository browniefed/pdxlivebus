export interface VehicleResponse {
  resultSet: ResultSet;
}

interface ResultSet {
  queryTime: number;
  vehicle: Vehicle[];
}

interface Vehicle {
  expires: number;
  signMessage?: string;
  serviceDate: number;
  loadPercentage?: any;
  latitude: number;
  nextStopSeq?: number;
  source: string;
  type: string;
  blockID?: number;
  signMessageLong?: string;
  lastLocID?: number;
  nextLocID?: number;
  locationInScheduleDay?: number;
  newTrip?: boolean;
  longitude: number;
  direction: number;
  inCongestion?: boolean;
  routeNumber: number;
  bearing: number;
  garage?: string;
  tripID?: string;
  delay?: number;
  extraBlockID?: number;
  messageCode?: number;
  lastStopSeq?: number;
  vehicleID: number;
  time: number;
  offRoute: boolean;
}
