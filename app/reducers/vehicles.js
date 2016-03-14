import { UPDATE_VEHICLES } from "../actions/vehicles";
const initialState = [];

const vehiclesReducer = (state = initialState, action ) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
      return action.vehicles;
    default:
    return state;
  }
}

export default vehiclesReducer;
