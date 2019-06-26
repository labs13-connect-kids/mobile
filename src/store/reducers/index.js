import { combineReducers } from 'redux';
import { authReducer as auth } from './authReducer';
import { peopleSearchReducer as people } from './peopleSearchReducer';
import { eventTrackingReducer as eventTracking } from './eventTrackingReducer';
import { famConInterestReducer as famConInterest } from './famConInterestReducer';
import { recentSearchesReducer as recentSearches } from './recentSearchesReducer';

export default combineReducers({
  auth,
  people,
  eventTracking,
  famConInterest,
  recentSearches
});
