import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import jwtDecode from 'jwt-decode';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds } from '../../store/actions';
import AuthenticationView from '../../screens/AuthenticationView';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

class Auth0LoginContainer extends Component {
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

    authHelpers.setItem('auth0Data', result);
    this.props.setUserCreds(decoded, result);
  };

  onRegister = () => {};

  render() {
    return (
      <Login
        navigation={this.props.navigation}
        onLogin={() => authHelpers._loginWithAuth0(this.handleResponse)}
        onRegister={this.onRegister}
      />
    );
  }
}
const Login = props => {
  return (
    <View style={styles.logInBtns}>
      <Button style={styles.button} block onPress={props.onLogin}>
        <Text style={styles.btnText}>Login </Text>
      </Button>
      <AuthenticationView onLogin={props.onLogin} />
    </View>
  );
};

const mapStateToProps = state => {
  const { user, isLoggedIn, authToken, idToken } = state.auth;
  return { user, isLoggedIn, authToken, idToken };
};

const styles = StyleSheet.create({
  logInBtns: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  btnText: {
    color: '#fff'
  }
});

export default connect(
  mapStateToProps,
  { setUserCreds }
)(Auth0LoginContainer);
