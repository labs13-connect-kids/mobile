import React, { Component } from 'react';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds, logOut } from '../../store/actions';
import Login from './Login';

class Auth0LoginContainer extends Component {
  onRegister = () => {};

  render() {
    return (
      
      <Login
        navigation={this.props.navigation}
        onLogin={() =>
          authHelpers.handleLogin(
            authHelpers._loginWithAuth0,
            this.props.setUserCreds
          )
        }
        onRegister={() =>
          authHelpers.handleLogin(
            authHelpers._loginWithAuth0,
            this.props.setUserCreds
          )
        }
        isLoggedIn={this.props.isLoggedIn}
        logOut={this.props.logOut}
        setModalVisible={this.props.setModalVisible}
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
