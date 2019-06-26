import { SET_RECENT_SEARCHES } from '../actions/actionTypes';

const intialState = {
  recentSearches: [],
  recentSearchCapacity: 3
};

export const recentSearchesReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_RECENT_SEARCHES:
      return {
        ...state,
        recentSearches: [...action.payload]
      };

    default:
      return state;
  }
};
