import { AuthSession } from 'expo';
import React, { Component } from 'react';

const auth0Domain = `lambda-connect-kids.auth0.com`;
const auth0ClientId = 'CxJ6UkC11uAAwCyvdTW20fudtLtJ21gz';

function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}

export default class Auth0LoginContainer extends Component {
  _loginWithAuth0 = async () => {
    console.log('fired');
    const redirectUrl = AuthSession.getRedirectUrl();
    let authUrl =
      `${auth0Domain}/authorize` +
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
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({ authUrl });
    console.log('RESULT', result);
    if (result.type === 'success') {
      console.log(result);
      let token = result.params.access_token;
      console.log(token);
      // this.props.setToken(token);
      // this.props.navigation.navigate("Next Screen");
    }
  };

  render() {
    return (
      <Login
        navigation={this.props.navigation}
        onLogin={() => this._loginWithAuth0()}
      />
    );
  }
}

// import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native';

const Login = props => {
  return (
    <TouchableHighlight onPress={props.onLogin}>
      <Text>Login </Text>
    </TouchableHighlight>
  );
};

// export default loginWithAuth0

// https://auth.expo.io/@wcolts2000/connectOurKids#
// access_token=
// uxxyfg5T35HaiiwGGZBUokVrsjbUOEFD
// &id_token=
// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qRkNRalUxTXprMVFqZzFRamM1TmpFeU16VTNNRUZGTlRoQlEwTXpOMEk1UVRCRVF6TTVPUSJ9.eyJuaWNrbmFtZSI6InJ5dHdhbGtlciIsIm5hbWUiOiJyeXR3YWxrZXJAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzU4MmE1ZmZmMDBmMzY2NzZmMTRjNmFjOTU5MzYwMjM2P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcnkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDYtMThUMjM6NDk6MTMuNDA2WiIsImVtYWlsIjoicnl0d2Fsa2VyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9sYW1iZGEtY29ubmVjdC1raWRzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDA5NzE0MzZjNjQ3ZDBjYjAyNjMyZmQiLCJhdWQiOiJDeEo2VWtDMTF1QUF3Q3l2ZFRXMjBmdWR0THRKMjFneiIsImlhdCI6MTU2MDkwMTc1MywiZXhwIjoxNTYwOTM3NzUzLCJub25jZSI6IjJuc3hzbjl1dDV4aXU4ZGowN2o5MXIifQ.BY8amVi7kali6KMLT1eYe7uymjRCDDEPUBPExB8WdyCaFbJlLauAGy13mxGo03QPQesbaD49L1JWuerMoDVzt2POErD00cu5f4oeIZ5oDnc5wSNSFNVFrdNRq5kR2H6LoJoNo6XCXKQfMr8OtH6eIhByDfE-TBgtr7bo02nbQ-TLEDQcfA34HuqW7C5SkpSzM5FMF-bvb1IhBntRWga2iU4AKgtvk1I9WtBUnpQEcVLRhhLpWZKbIOtx7Ucv7_xk2SxFmEAozCg5vkvJ8d-dbTzv6htSYkorq5KEP4_aNHCST0zPC4TV96-rH_KNrfbJ09J-FhW5eqmkVgtDZS08tw
// &expires_in=86400&token_type=Bearer
