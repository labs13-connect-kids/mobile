import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import jwtDecode from 'jwt-decode';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds } from '../../store/actions';
// import { AsyncStorage } from 'react-native';

class Auth0LoginContainer extends Component {
  state = {
    name: null
  };

  handleResponse = result => {
    if (result.params.error) {
      Alert(
        'Authentication error',
        result.params.error_description || 'something went wrong'
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = result.params.id_token;
    const decoded = jwtDecode(jwtToken);

    console.log('RESULT ', result);
    console.log('RESULT params', result.params);
    console.log('DECODED HANDLE RESPONSE', decoded);
    console.log('jwt TOKEN HANDLE RESPONSE', jwtToken);

    const { name } = decoded;
    this.setState({ name });
    authHelpers.setItem('auth0Data', result);
    this.props.setUserCreds(decoded, result);
  };

  render() {
    const { name } = this.state;

    return name ? (
      <View>
        <Text style={styles.title}>Hello {name}!</Text>
        <TouchableHighlight
          onPress={() => {
            console.log('PRESSED');
            authHelpers.getToken();
          }}
        >
          <Text>Read ME </Text>
        </TouchableHighlight>
      </View>
    ) : (
      <Login
        navigation={this.props.navigation}
        onLogin={() => authHelpers._loginWithAuth0(this.handleResponse)}
      />
    );
  }
}

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
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  console.log('REDUX STATE', state);
  const { user, isLoggedIn, authToken, idToken } = state.auth;
  return { user, isLoggedIn, authToken, idToken };
};

export default connect(
  mapStateToProps,
  { setUserCreds }
)(Auth0LoginContainer);
