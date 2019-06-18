import {
  FETCH_PEOPLE_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAILURE,
  FETCH_PERSON_SUCCESS,
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_RESULT_FAILURE,
  RESET_STATE
} from '../actions/actionTypes';

const intialState = {
  error: null,
  isFetching: false,
  person: null,
  possiblePersons: []
};

export const peopleSearchReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_PERSON:
    case FETCH_SEARCH_RESULT:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        possiblePersons: [...action.payload],
        error: null
      };
    case FETCH_PERSON_SUCCESS:
      return {
        ...state,
        isFetching: false,
        person: { ...action.payload },
        error: null
      };
    case FETCH_PERSON_FAILURE:
    case FETCH_SEARCH_RESULT_FAILURE:
      return {
        error: action.payload,
        isFetching: false,
        person: null,
        possiblePersons: []
      };
    case RESET_STATE:
      return intialState;
    default:
      return state;
  }
};
