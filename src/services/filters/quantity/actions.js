import { UPDATE_FILTER_QUANTITY } from './actionTypes';

export const updateFilterQuantity = filterQuantity => ({
  type: UPDATE_FILTER_QUANTITY,
  payload: filterQuantity
});
