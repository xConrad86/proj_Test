import { GET_PRODUCTLIST } from './actionTypes';

const initialState = {
  productsList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTLIST:
      console.log("get products " , action.payload);
      return {
        ...state,
        productsList: action.payload
      };
    default:
      return state;
  }
}