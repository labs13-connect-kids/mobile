import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

const Login = props => {
  return (
    <View style={styles.logInBtns}>
      {props.isLoggedIn ? (
        <Button style={styles.button} onPress={props.logOut} block>
          <Text style={styles.logOutText}>Log Out</Text>
        </Button>
      ) : (
        <View style={{ marginTop: 50 }}>
          <Button style={styles.button} block onPress={props.onLogin}>
            <Text style={styles.btnText}>Login </Text>
          </Button>
          <Button
            style={styles.button}
            block
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.btnText}>Register</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logInBtns: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  logOutText: {
    color: '#fff'
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
