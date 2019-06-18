import { combineReducers } from 'redux';
import { authReducer as auth } from './authReducer';
import { peopleSearchReducer as people } from './peopleSearchReducer';

export default combineReducers({ auth, people });
