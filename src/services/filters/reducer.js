import { UPDATE_FILTER,
         LOAD_FILTERS,
         ADD_FILTER,
         REMOVE_FILTER,
         REMOVE_FILTERS
         } from './actionTypes';

const initialState = {
  filters: []
};

export default function(state = initialState, action) {
  
  console.log("before:" , state, action);
  
  if (state === undefined) {
      state = [];    
  }
  
  switch (action.type) {
    case LOAD_FILTERS:      
      return {
        ...state,
        filters: action.payload                
      };
      case ADD_FILTER:
        return {
          ...state,
          filterToAdd: Object.assign({}, action.payload)
        };
      case REMOVE_FILTER:
        return {
          ...state,
          filterToRemove: Object.assign({}, action.payload)
        };
      case REMOVE_FILTERS:
        return [];   
        
      case UPDATE_FILTER:
        return {
          ...state,          
          filters: action.payload          
        };

    default:      
      return state;
  }  
}
