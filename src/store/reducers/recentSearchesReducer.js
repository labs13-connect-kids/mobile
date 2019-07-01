import {
  SAVING_RECENT_SEARCHES,
  SET_RECENT_SEARCHES,
  STOP_SAVING_RECENT_SEARCHES
} from '../actions/actionTypes';

const intialState = {
  isSavingRecentSearches: false,
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
    case SAVING_RECENT_SEARCHES:
      return {
        ...state,
        isSavingRecentSearches: true
      };
    case STOP_SAVING_RECENT_SEARCHES:
      return {
        ...state,
        isSavingRecentSearches: false
      };
    default:
      return state;
  }
};
