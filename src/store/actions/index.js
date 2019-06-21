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
  LOG_OUT,
  EVENT_ERROR,
  EVENT_SUCCESS
} from './actionTypes';
import constants from '../../helpers/constants';

export const fetchSearchResult = (
  body,
  cb,
  eventTrack,
  createEvent
) => dispatch => {
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
        eventTrack(createEvent('success'));
      } else if (res.data.person) {
        isPerson = true;
        dispatch({
          type: FETCH_PERSON_SUCCESS,
          payload: res.data.person
        });
        eventTrack(createEvent(['success']));
      }
    })
    .then(() => {
      if (isPerson) {
        cb();
      }
    })
    .catch(err => {
      console.log('did we make it to this error', err);
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });

      eventTrack(createEvent('failed'));
    });
};

export const fetchPerson = (
  searchPointer,
  eventTrack,
  createEvent
) => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${constants.devURL}`, { search_pointer_hash: searchPointer })
    .then(res => {
      dispatch({
        type: FETCH_PERSON_SUCCESS,
        payload: res.data.person
      });
      eventTrack(createEvent(['success']));
    })
    .catch(err => {
      dispatch({ type: FETCH_PERSON_FAILURE, payload: err });
      eventTrack(createEvent(['failed']));
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

export const eventTrack = event => dispatch =>
  axios
    .post(constants.devEventTrackingURL, event)
    .then(res => {
      console.log('EVENT TRACK RES: ', res);
      if (res.status !== 502) {
        dispatch({ type: EVENT_ERROR });
        console.log('Event Error .then');
      } else {
        dispatch({ type: EVENT_SUCCESS });
        console.log('Event Success');
      }
    })
    .catch(err => {
      // if (err.statusCode !== 502) {
      //   dispatch({ type: EVENT_ERROR });
      //   console.log('Event Error .then', err);
      // } else {
      dispatch({ type: EVENT_SUCCESS });
      console.log('Event Success');
      // }
    });
