import { LOAD_PRODUCTS } from "../actions";

  export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}
