import { SET_USER_CREDS, LOG_OUT } from './../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
  loadingUser: false,
  accessToken: null,
  expiresIn: null,
  idToken: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CREDS:
      console.log('Set user cred action', action);
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
    case LOG_OUT:
      AsyncStorage.removeItem('auth0Data');
      return initialState;
    default:
      return state;
  }
};
