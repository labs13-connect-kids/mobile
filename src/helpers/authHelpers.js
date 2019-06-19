import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';

const auth0Domain = `lambda-connect-kids.auth0.com`;
const auth0ClientId = 'CxJ6UkC11uAAwCyvdTW20fudtLtJ21gz';

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
      console.log('TOKEN VALUE FROM ASYNC', JSON.parse(value));
    } else {
      console.log('NOTHING HERE');
    }
  } catch (e) {
    // error reading value
    console.log('ERROR IN GET DATA');
  }
};
const setToken = async decoded => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(decoded));
  } catch (e) {
    console.log('ERROR', e); // bad error handling I know #REFACTOR
  }
};
const _loginWithAuth0 = async handleResponse => {
  const redirectUrl = AuthSession.getRedirectUrl();
  let authUrl =
    `https://${auth0Domain}/authorize` +
    toQueryString({
      client_id: auth0ClientId,
      response_type: 'token',
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
  console.log('RESULT', result);

  if (result.type === 'success') {
    handleResponse(result.params);
  }
};

export default {
  toQueryString,
  setToken,
  getToken,
  _loginWithAuth0
};
