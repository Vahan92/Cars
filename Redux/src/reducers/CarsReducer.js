import { FETCH_CARS } from '../actions/types';

const initialState = {
  users: [],
  user: {},
  loading: true,
  modalShow: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };    
    default:
      return state;
  }
}
