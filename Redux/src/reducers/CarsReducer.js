import { FETCH_CARS } from '../actions/types';

const initialState = {
  cars: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };    
    default:
      return state;
  }
}
