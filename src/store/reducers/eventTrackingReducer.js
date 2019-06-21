//IMPORTS
import { EVENT_ERROR, EVENT_SUCCESS } from '../actions/actionTypes';

//INITIAL STATE
const initialState = {
  error: null
};

//REDUCER EXPORT
export const eventTrackingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_ERROR:
      console.log('event tracked reducer Error');
      return {
        ...state,
        error: 'error'
      };

    case EVENT_SUCCESS:
      console.log('event tracked reducer success');
      return initialState;

    default:
      return state;
  }
};
