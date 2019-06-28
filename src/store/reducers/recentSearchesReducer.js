import { SET_RECENT_SEARCHES } from '../actions/actionTypes';

const intialState = {
  recentSearches: [],
  recentSearchCapacity: 3,
  recentSearchesLoaded: false
};

export const recentSearchesReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_RECENT_SEARCHES:
      return {
        ...state,
        recentSearches: [...action.payload],
        recentSearchesLoaded: true
      };

    default:
      return state;
  }
};
