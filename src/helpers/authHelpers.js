import { AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import getEnvVars from '../../environment';

const { auth0Domain, auth0ClientId } = getEnvVars();

const toQueryString = params => {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
};
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // value previously stored
      // console.log('TOKEN VALUE FROM ASYNC', JSON.parse(value));
    } else {
      console.log('NOTHING HERE');
    }
  } catch (e) {
    // error reading value
    console.log('ERROR IN GET DATA');
  }
};
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('SET TOKEN ERROR', e);
  }
};
const _loginWithAuth0 = async handleResponse => {
  const redirectUrl = AuthSession.getRedirectUrl();
  let authUrl =
    `https://${auth0Domain}/authorize` +
    toQueryString({
      client_id: auth0ClientId,
      response_type: 'token id_token',
      scope: 'openid profile email',
      redirect_uri: redirectUrl,
      nonce:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
    });

  const result = await AuthSession.startAsync({ authUrl });
  // console.log('RESULT', result);

  if (result.type === 'success') {
    handleResponse(result);
  }
};

export default {
  toQueryString,
  setItem,
  getToken,
  _loginWithAuth0
};
