import {
  POPULATE_PERSON,
  POPULATE_SEARCH_RESULTS,
  SET_RECENT_SEARCHES,
  STOP_SAVING_RECENT_SEARCHES
} from './actionTypes';

export const populatePerson = data => {
  return { type: POPULATE_PERSON, payload: data };
};

export const populateSearchResults = data => {
  return { type: POPULATE_SEARCH_RESULTS, payload: data };
};

export const setRecentSearches = recentSearches => {
  return { type: SET_RECENT_SEARCHES, payload: recentSearches };
};

export const stopSavingRecentSearches = () => {
  return { type: STOP_SAVING_RECENT_SEARCHES };
};
