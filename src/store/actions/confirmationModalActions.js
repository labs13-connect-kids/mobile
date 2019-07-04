import { GET_INFO, MODAL_VISIBLE, STOP_SEARCH_ME } from './actionTypes';

export const getInfo = (key, type) => {
  return { type: GET_INFO, payload: { key: key, queryType: type } };
};

export const showModal = visible => {
  return { type: MODAL_VISIBLE, payload: visible };
};

export const stopSearchMe = () => {
  return { type: STOP_SEARCH_ME };
};
