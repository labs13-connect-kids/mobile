import React from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent';

const Login = props => {
  return (
    <View style={styles.linkContainer}>
      <View style={styles.logInBtns}>
        {props.isLoggedIn ? (
          <View style={{ width: '100%' }}>
            <Button
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={() => props.logOut(props.email)}
              block
            >
              <Text style={styles.logOutText}>Log Out</Text>
            </Button>
          </View>
        ) : (
          <View style={styles.logInBtns}>
            <Button style={styles.buttonStyle} block onPress={props.onLogin}>
              <Text style={styles.btnText}>Login </Text>
            </Button>
            <Button
              style={styles.buttonStyle}
              block
              onPress={() => {
                props.setModalVisible(true);
                sendEvent(null, 'click', 'sign-up');
              }}
            >
              <Text style={styles.btnText}>Sign Up</Text>
            </Button>
          </View>
        )}
      </View>
      <View>
        <Button
          style={[styles.button, styles.primaryBtn]}
          block
          onPress={() => props.navigation.navigate('PeopleSearch')}
        >
          <Text style={[styles.primaryBtnText, styles.lightBtn]}>
            People Search
          </Text>
          <Text style={[styles.buttonText, styles.lightBtn]}>
            Find Contact Information for Anyone
          </Text>
        </Button>
        <Button
          style={[styles.button, styles.primaryBtn]}
          bordered
          block
          onPress={() => props.navigation.navigate('FamilyConnections')}
        >
          <Text style={[styles.primaryBtnText, styles.lightBtn]}>
            Family Connections
          </Text>
          <Text style={[styles.buttonText, styles.lightBtn]}>
            Family Trees for Permanency
          </Text>
        </Button>
        <Button
          style={[styles.button, styles.lastBtn, styles.primaryBtn]}
          bordered
          block
          onPress={() => Linking.openURL('https://connectourkids.org')}
        >
          <Text style={[styles.primaryBtnText, styles.lightBtn]}>
            Resources
          </Text>
          <Text style={[styles.buttonText, styles.lightBtn]}>
            Useful Materials and Information
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logInBtns: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  logOutText: {
    color: '#fff'
  },
  linkContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 60
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  btnText: {
    color: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  mainText: {
    fontFamily: constants.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 5
  },
  videoText: {
    color: constants.highlightColor,
    fontWeight: 'bold',
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  },
  primaryBtn: {
    backgroundColor: constants.highlightColor
  },
  primaryBtnText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: constants.highlightColor,
    flex: 1
  },
  buttonText: {
    color: constants.highlightColor,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  lightBtn: {
    color: '#fff'
  },
  lastBtn: {
    marginBottom: 50
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  },

  red: {
    backgroundColor: 'red'
  },
  videoContainer: {
    justifyContent: 'center',
    height: 300,
    marginBottom: 30
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0
  }
});

export default Login;
