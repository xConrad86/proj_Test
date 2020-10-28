import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer.js';
import cartReducer from './cart/reducer';
import totalReducer from './total/reducer';
import filtersReducer from './filters/reducer';
import sortReducer from './sort/reducer';
import filterQuantityReducer from './filters/quantity/reducer';
import productsListReducer from './shelf/reducerProducts.js';
import productsListUFReducer from './shelf/reducerProductsUF.js';

export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  total: totalReducer,
  filterObj: filtersReducer,
  sort: sortReducer,
  filterQuantity: filterQuantityReducer,
  apiProducts: productsListReducer,
  apiProductsUF: productsListUFReducer
});
