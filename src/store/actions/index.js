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
  SET_MODAL_VISIBLE,
  SET_VIDEO_AGREE_VISIBLE,
  SET_VIDEO_PLAYER_VISIBLE,
  RESET_PERSON,
  SET_RECENT_SEARCHES,
  POPULATE_SEARCH_RESULTS,
  POPULATE_PERSON,
  SAVING_RECENT_SEARCHES,
  STOP_SAVING_RECENT_SEARCHES,
  MODAL_VISIBLE,
  GET_INFO,
  STOP_SEARCH_ME
} from './actionTypes';
import constants from '../../helpers/constants';
import saveToRecentSearches from '../../helpers/saveToRecentSearches';
import { sendEvent, createOptions } from './../../helpers/createEvent';

export const fetchSearchResult = (body, cb, email) => dispatch => {
  dispatch({ type: FETCH_SEARCH_RESULT });
  let isPerson = false;
  let options;
  axios
    .post(`${constants.devURL}`, body.requestObject)
    .then(res => {
      if (res.data.possible_persons) {
        options = createOptions(res.data.possible_persons.length, null, null);
        dispatch({
          type: FETCH_PEOPLE_SUCCESS,
          payload: res.data.possible_persons
        });
        console.log(
          'Sent payload people',
          email,
          'search',
          'person',
          'success',
          options
        );
        sendEvent(email, 'search', 'person', 'success', options);
        // SAVE TO RECENT SEARCH
        if (body.searchType && body.searchInput) {
          saveToRecentSearches({
            searchType: body.searchType,
            searchInput: body.searchInput,
            data: res.data.possible_persons
          });
          dispatch({ type: SAVING_RECENT_SEARCHES });
        }
      } else if (res.data.person) {
        options = createOptions(0, null, null);
        isPerson = true;
        dispatch({
          type: FETCH_PERSON_SUCCESS,
          payload: res.data.person
        });
        console.log(
          'Sent payload person',
          email,
          'search',
          'person',
          'success',
          options
        );
        sendEvent(email, 'search', 'person', 'success', options);
        // SAVE TO RECENT SEARCH
        if (body.searchType && body.searchInput) {
          saveToRecentSearches({
            searchType: body.searchType,
            searchInput: body.searchInput,
            data: res.data.person
          });
          dispatch({ type: SAVING_RECENT_SEARCHES });
        }
      } else if (res.data.persons_count === 0 || res.data["@persons_count"] === 0) {
        dispatch({
          type: FETCH_SEARCH_RESULT_FAILURE,
          data: res.data.query,
          query: res.data.query,
          payload: true
        });
        sendEvent(email, 'search', 'person', 'success', options);
      }
    })
    .then(() => {
      if (isPerson) {
        cb();
      }
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });
      console.log('search catch');
      sendEvent(email, 'search', 'person', 'failed');
    });
};

export const fetchPerson = (body, email) => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${constants.devURL}`, body)
    .then(res => {
      dispatch({
        type: FETCH_PERSON_SUCCESS,
        payload: res.data.person
      });
      options = createOptions(0, null, null);
      sendEvent(email, 'search', 'person', 'success', options);
    })
    .catch(err => {
      dispatch({ type: FETCH_PERSON_FAILURE, payload: err });
      sendEvent(email, 'search', 'person', 'failed');
    });
};

export const resetState = () => {
  return { type: RESET_STATE };
};

export const setUserCreds = (decodedToken, auth0Data) => {
  return { type: SET_USER_CREDS, decodedToken, auth0Data };
};

export const logOut = email => {
  sendEvent(email, 'click', 'logout');
  return { type: LOG_OUT };
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

export const setRecentSearches = recentSearches => {
  return { type: SET_RECENT_SEARCHES, payload: recentSearches };
};

export const populateSearchResults = data => {
  return { type: POPULATE_SEARCH_RESULTS, payload: data };
};

export const populatePerson = data => {
  return { type: POPULATE_PERSON, payload: data };
};
export const stopSavingRecentSearches = () => {
  return { type: STOP_SAVING_RECENT_SEARCHES };
};
export const showModal = visible => {
  return { type: MODAL_VISIBLE, payload: visible };
};

export const getInfo = (key, type) => {
  console.log('payload from redux = ', key, type);
  return { type: GET_INFO, payload: { key: key, queryType: type } };
};

export const stopSearchMe = () => {
  return { type: STOP_SEARCH_ME };
};

export const sendSearchErrorMessage = (errorObject) =>{
  return { 
    type: FETCH_SEARCH_RESULT_FAILURE,
    payload: errorObject
  }
}
