import React, { Component } from 'react';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds, logOut, clearRedirectPath } from '../../store/actions';
import Login from './Login';

class LoginWithAuth0 extends Component {
  onRegister = () => {};

  componentDidUpdate(prevProps, prevState) {
    console.log('CDU');
    if (
      prevProps.user === null &&
      this.props.user !== null &&
      this.props.redirectPath !== ''
    ) {
      console.log('CDU conditional firing');
      this.props.navigation.navigate(this.props.redirectPath);
      // this.props.navigation.navigate('FamilyConnections');
      this.props.setModalVisible(false);
      // this.props.clearRedirectPath();
    }
  }

  render() {
    console.log('login props: ', this.props);
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
  const { user, isLoggedIn, authToken, idToken, redirectPath } = state.auth;
  return { user, isLoggedIn, authToken, idToken, redirectPath };
};

export default connect(
  mapStateToProps,
  { setUserCreds, logOut, clearRedirectPath }
)(LoginWithAuth0);
