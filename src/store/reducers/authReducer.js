import {
  SET_USER_CREDS,
  LOG_OUT,
  SET_MODAL_VISIBLE,
  SET_VIDEO_AGREE_VISIBLE,
  SET_VIDEO_PLAYER_VISIBLE
} from './../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
  loadingUser: false,
  accessToken: null,
  expiresIn: null,
  idToken: null,
  modalVisible: false,
  videoAgree: false,
  videoVisible: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CREDS:
      return {
        ...state,
        user: action.decodedToken,
        isLoggedIn: true,
        accessToken: action.auth0Data.params.access_token,
        idToken: action.auth0Data.params.id_token,
        expiresIn: action.auth0Data.params.expires_in,
        error: null,
        loadingUser: false
      };
    case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.payload,
        videoAgree: false,
        videoVisible: false
      };
    case SET_VIDEO_AGREE_VISIBLE:
      return {
        ...state,
        videoAgree: true
      };
    case SET_VIDEO_PLAYER_VISIBLE:
      return {
        ...state,
        videoAgree: false,
        videoVisible: true
      };
    case LOG_OUT:
        
      AsyncStorage.clear();
      AsyncStorage.removeItem('auth0Data');
      AsyncStorage.removeItem('expiresAt');
      AsyncStorage.removeItem('recentSearchesCache');
      return initialState;
    default:
      return state;
  }
};
