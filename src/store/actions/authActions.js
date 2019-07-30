import {
  LOG_OUT,
  SET_MODAL_VISIBLE,
  SET_VIDEO_AGREE_VISIBLE,
  SET_VIDEO_PLAYER_VISIBLE,
  SET_USER_CREDS
} from './actionTypes';
import { sendEvent } from './../../helpers/createEvent';

export const logOut = email => {
  console.log('logout called');
  // sendEvent(email, 'click', 'logout');
  return { type: LOG_OUT };
};

export const setUserCreds = (decodedToken, auth0Data) => {
  return { type: SET_USER_CREDS, decodedToken, auth0Data };
};

// Sign Up Modal Sequence Actions
export const setModalVisible = visible => {
  return { type: SET_MODAL_VISIBLE, payload: visible };
};

export const setAgreeModalVisible = visible => {
  return { type: SET_VIDEO_AGREE_VISIBLE, payload: visible };
};

export const setVideoPlayerModalVisible = visible => {
  return { type: SET_VIDEO_PLAYER_VISIBLE, payload: visible };
};
