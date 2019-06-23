import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import AuthenticationView from './../../screens/AuthenticationView';
import constants from '../../helpers/constants';

const Login = props => {
  return (
    <View style={styles.logInBtns}>
      <Button style={styles.button} block onPress={props.onLogin}>
        <Text style={styles.btnText}>Login </Text>
      </Button>
      <AuthenticationView
        onLogin={props.onLogin}
        logOut={props.logOut}
        isLoggedIn={props.isLoggedIn}
      />
    </View>
  );
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

export default Login;
