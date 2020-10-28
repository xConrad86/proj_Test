import { UPDATE_FILTER_NAME } from './actionTypes';

export const updateFilterName = filterName => ({
  type: UPDATE_FILTER_NAME,
  payload: filterName
});
