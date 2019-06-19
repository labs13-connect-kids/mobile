
import { AuthSession } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import jwtDecode from 'jwt-decode';

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
    state = {
        name: null,
    };

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
            this.handleResponse(result.params)
        }
    };

    handleResponse = (result) => {
        if (result.error) {
            Alert('Authentication error', result.error_description || 'something went wrong');
            return;
        }

        // Retrieve the JWT token and decode it
        const jwtToken = result.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        this.setState({ name });
    };

    render() {
        const { name } = this.state;

        return (
            name ? 
            <Text style={styles.title}>Hello {name}!</Text> :
            <Login
                navigation={this.props.navigation}
                onLogin={() => this._loginWithAuth0()} 
            /> 
        );
    }
}

// import React from 'react'

const Login = props => {
    return (
        <TouchableHighlight onPress={props.onLogin}>
            <Text>Login </Text>
        </TouchableHighlight>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
});

// export default loginWithAuth0

