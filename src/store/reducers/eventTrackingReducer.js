
//IMPORTS
import { EVENT_ERROR ,  EVENT_SUCCESS } from '../actions/actionTypes';

//INITIAL STATE
const initialState = {
    error: null,
}

//REDUCER EXPORT
export const eventTrackingReducer = ( state = initialState , action ) => {
    switch( action.type ) {

        case EVENT_ERROR: 
            return{ 
                ...state,
                error: 'error'
            }

        case EVENT_SUCCESS:
            return initialState

        default: return state
    }
}