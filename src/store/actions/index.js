import axios from 'axios';
import {
  FETCH_PEOPLE_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAILURE,
  FETCH_PERSON_SUCCESS,
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_RESULT_FAILURE,
  RESET_STATE,
  SET_USER_CREDS,
  LOG_OUT
} from './actionTypes';
import constants from '../../helpers/constants';

export const fetchSearchResult = (body, cb, eventTrack) => dispatch => {
  dispatch({ type: FETCH_SEARCH_RESULT });
  let isPerson = false;
  axios
    .post(`${constants.devURL}`, body)
    .then(res => {
      console.log(res.data);
      if (res.data.possible_persons) {
        dispatch({
          type: FETCH_PEOPLE_SUCCESS,
          payload: res.data.possible_persons
        });
      } else if (res.data.person) {
        isPerson = true;
        dispatch({
          type: FETCH_PERSON_SUCCESS,
          payload: res.data.person
        });
      } else if (res.data.persons_count === 0) {
        dispatch({
          type: FETCH_SEARCH_RESULT_FAILURE,
          payload: true
        });
      }
    })
    .then(() => {
      if (isPerson) cb(), eventTrack('success');
    })
    .catch(err => {
      console.log('did we make it to this error', err);
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });
      eventTrack('failed');
    });
};

export const fetchPerson = searchPointer => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${constants.devURL}`, { search_pointer_hash: searchPointer })
    .then(res => {
      dispatch({
        type: FETCH_PERSON_SUCCESS,
        payload: res.data.person
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_PERSON_FAILURE, payload: err });
    });
};

export const resetState = () => {
  return { type: RESET_STATE };
};

export const setUserCreds = (decodedToken, auth0Data) => {
  return { type: SET_USER_CREDS, decodedToken, auth0Data };
};

export const logOut = () => {
  return { type: LOG_OUT };
};
