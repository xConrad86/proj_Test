import { GET_PRODUCTSLIST_UNFILTERED } from './actionTypes';

const initialState = {
  productsListUF: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTSLIST_UNFILTERED:
      
      return {
        ...state,
        productsListUF: action.payload
      };
    default:
      return state;
  }
}