import {
  FETCH_PEOPLE_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAILURE,
  FETCH_PERSON_SUCCESS,
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_RESULT_FAILURE,
  RESET_STATE
} from './actionTypes';
import constants from '../../helpers/constants';

export const fetchSearchResult = body => dispatch => {
  dispatch({ type: FETCH_SEARCH_RESULT });
  axios
    .post(`${devURL}`, body)
    .then(res => {
      if (res.data.possible_persons) {
        dispatch({
          type: FETCH_PEOPLE_SUCCESS,
          payload: res.data.possible_persons
        });
      } else if (res.data.person) {
        dispatch({
          type: FETCH_PERSON_SUCCESS,
          payload: res.data.person
        });
      }
    })
    .catch(err => {
      dispatch({ type: FETCH_SEARCH_RESULT_FAILURE, payload: err });
    });
};

export const fetchPerson = searchPointer => dispatch => {
  dispatch({ type: FETCH_PERSON });
  axios
    .post(`${devURL}`, constants.devURL, { search_pointer_hash: searchPointer })
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
