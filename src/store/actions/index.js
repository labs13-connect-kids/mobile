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
  SET_USER_CREDS_SUCCESS,
  SET_USER_CREDS_FAILURE
} from './actionTypes';
import constants from '../../helpers/constants';

export const fetchSearchResult = (body, cb) => dispatch => {
  dispatch({ type: FETCH_SEARCH_RESULT });
  let isPerson = false;
  axios
    .post(`${constants.devURL}`, body)
    .then(res => {
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
      }
    })
    .then(() => {
      if (isPerson) cb();
    })
    .catch(err => {
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });
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
// export const setUserCreds = token => {
//   dispatch({ type: SET_USER_CREDS});
// };
// export const setUserCreds = token => {
//   dispatch({ type: SET_USER_CREDS});
// };
