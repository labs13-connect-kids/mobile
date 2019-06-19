import { AuthSession } from 'expo';
import React, { Component } from 'react';

const auth0Domain = `https://lambda-connect-kids.auth0.com`;
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

