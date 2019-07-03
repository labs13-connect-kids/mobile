import axios from 'axios';
import {
  FETCH_PEOPLE_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAILURE,
  FETCH_PERSON_SUCCESS,
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_RESULT_FAILURE,
  RESET_PERSON,
  RESET_STATE,
  SAVING_RECENT_SEARCHES
} from './actionTypes';

import getEnvVars from '../../../environment';
import saveToRecentSearches from '../../helpers/saveToRecentSearches';
import { sendEvent, createOptions } from './../../helpers/createEvent';

const { peopleSearchURL } = getEnvVars();

export const fetchPerson = (body, email) => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${peopleSearchURL}`, body)
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

export const fetchSearchResult = (body, cb, email) => dispatch => {
  dispatch({ type: FETCH_SEARCH_RESULT });
  let isPerson = false;
  let options;
  axios
    .post(`${peopleSearchURL}`, body.requestObject)
    .then(res => {
      if (res.data.possible_persons) {
        options = createOptions(res.data.possible_persons.length, null, null);
        dispatch({
          type: FETCH_PEOPLE_SUCCESS,
          payload: res.data.possible_persons
        });
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
      } else if (
        res.data.persons_count === 0 ||
        res.data['@persons_count'] === 0
      ) {
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
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });
      sendEvent(email, 'search', 'person', 'failed');
    });
};

export const resetPerson = () => {
  return { type: RESET_PERSON };
};

export const resetState = () => {
  return { type: RESET_STATE };
};

export const sendSearchErrorMessage = errorObject => {
  return {
    type: FETCH_SEARCH_RESULT_FAILURE,
    payload: errorObject
  };
};
