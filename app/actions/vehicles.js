

export const UPDATE_VEHICLES = 'UPDATE_VEHICLES';

export const updateVehicles = (vehicles) => {
  return {
    type: UPDATE_VEHICLES,
    vehicles
  }
}
