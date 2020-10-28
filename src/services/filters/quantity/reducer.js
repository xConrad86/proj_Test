import { UPDATE_FILTER_QUANTITY } from './actionTypes';

const initialState = {
  type: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_QUANTITY:
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
}
