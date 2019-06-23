import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds, logOut } from '../../store/actions';

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
        isLoggedIn={this.props.isLoggedIn}
      />
    );
  }
}

const mapStateToProps = state => {
  const { user, isLoggedIn, authToken, idToken } = state.auth;
  return { user, isLoggedIn, authToken, idToken };
};

export default connect(
  mapStateToProps,
  { setUserCreds, logOut }
)(Auth0LoginContainer);
