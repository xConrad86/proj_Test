import { UPDATE_FILTER, ADD_FILTER, LOAD_FILTERS, REMOVE_FILTER, REMOVE_FILTERS } from './actionTypes';

export const updateFilters = filters => ({
  type: UPDATE_FILTER,
  payload: filters
});


export const addFilter = filter => ({
  type: ADD_FILTER,
  payload: filter
});

export const loadFilters = filters => ({
  type: LOAD_FILTERS,
  payload: filters
});

export const removeFilters = filters => ({
  type: REMOVE_FILTERS,
  payload: filters
});

export const removeFilter = filter => ({
  type: REMOVE_FILTER,
  payload: filter
});