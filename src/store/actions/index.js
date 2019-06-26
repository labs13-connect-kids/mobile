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
  EVENT_SUCCESS,
  TRACK_EMAIL,
  TRACK_EMAIL_SUCCESS,
  TRACK_EMAIL_FAILURE,
  SET_MODAL_VISIBLE,
  SET_VIDEO_AGREE_VISIBLE,
  SET_VIDEO_PLAYER_VISIBLE,
  RESET_PERSON,
  SET_REDIRECT_PATH,
  CLEAR_REDIRECT_PATH
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
      } else if (res.data.persons_count === 0) {
        dispatch({
          type: FETCH_SEARCH_RESULT_FAILURE,
          payload: true
        });
        eventTrack(createEvent(['failed']));
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

export const fetchPerson = (body, eventTrack, createEvent) => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${constants.devURL}`, body)
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
      dispatch({ type: EVENT_SUCCESS });
      console.log('Event Successfully tracked');
    });

export const trackEmail = email => dispatch => {
  dispatch({ type: TRACK_EMAIL });
  return axios
    .post(constants.devFamilyConnectionsInterestURL, email)
    .then(res => {
      console.log('EMAIL TRACKING RES: ', res);
      return dispatch({
        type: TRACK_EMAIL_SUCCESS,
        payload: email.emailAddress
      });
    })
    .catch(err => {
      console.log('EMAIL TRACKING ERR: ', err);
      return dispatch({
        type: TRACK_EMAIL_FAILURE,
        payload: err,
        email: email.emailAddress
      });
    });
};

export const setModalVisible = visible => {
  return { type: SET_MODAL_VISIBLE, payload: visible };
};

export const setAgreeModalVisible = visible => {
  return { type: SET_VIDEO_AGREE_VISIBLE, payload: visible };
};

export const setVideoPlayerModalVisible = visible => {
  return { type: SET_VIDEO_PLAYER_VISIBLE, payload: visible };
};

export const resetPerson = () => {
  return { type: RESET_PERSON };
};

export const setRedirectPath = path => {
  return { type: SET_REDIRECT_PATH, payload: path };
};

export const clearRedirectPath = () => {
  return { type: CLEAR_REDIRECT_PATH };
};
