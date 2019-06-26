import { AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import getEnvVars from '../../environment';
import jwtDecode from 'jwt-decode';

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
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('SET TOKEN ERROR', e);
  }
};
const _loginWithAuth0 = async () => {
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

  return await AuthSession.startAsync({ authUrl });
};
const handleLogin = async (authSession, setUserCreds) => {
  // Retrieve the JWT token and decode it
  let result = await authSession();
  // if users cancels login process, terminate method
  if (result.type === 'dismiss') return;
  const jwtToken = result.params.id_token;
  const decoded = jwtDecode(jwtToken);

  setItem('auth0Data', result);
  setUserCreds(decoded, result);
};

export default {
  toQueryString,
  setItem,
  _loginWithAuth0,
  handleLogin
};
