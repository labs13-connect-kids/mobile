import React, { Component } from 'react';
import authHelpers from '../../helpers/authHelpers';
import { connect } from 'react-redux';
import { setUserCreds, logOut } from '../../store/actions';
import Login from './Login';

class Auth0LoginContainer extends Component {
  onRegister = () => {};
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.user === null &&
  //     this.props.user !== null &&
  //     prevProps.navigation.state.routeName === 'SearchResult'
  //   ) {
  //     // this.props.navigation.state.
  //     this.props.setModalVisible(false);
  //   }
  // }

  render() {
    console.log('LOGINWITHAUTH0 STATE: ', this.state, 'PROPS: ', this.props);
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
