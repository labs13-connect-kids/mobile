import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent';
import NavigationButton from '../../UI/NavigationButton';
import ScreenContainer from '../../UI/ScreenContainer';
import MainText from '../../UI/MainText';
// import {logOut} from '../../store/actions';

const Login = props => {
  return (
    <ScreenContainer style={{ padding: 10 }}>
      <MainText>
        {props.isLoggedIn
          ? 'Welcome back ' + props.email + '!'
          : 'Welcome to Connect Our Kids!'}
      </MainText>
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
        {/* <View>
          <Button 
            onPress={()=>{
              logOut();
            }}
            style={{width: 300, backgroundColor: 'red'}}>
            <Text>log out!!</Text>
          </Button>
        </View> */}
        <View>
          <NavigationButton
            titleText="People Search"
            subTitleText="Find Contact Information for Anyone"
            handlePress={() => props.navigation.navigate('PeopleSearch')}
          />
          <NavigationButton
            titleText="Family Connections"
            subTitleText="Family Trees for Permanency"
            handlePress={() => props.navigation.navigate('FamilyConnections')}
          />
          <NavigationButton
            titleText="Resources"
            subTitleText="Useful Materials and Information"
            handlePress={() => Linking.openURL('https://connectourkids.org')}
            style={{ marginBottom: 20 }}
          />
        </View>
      </View>
    </ScreenContainer>
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
    flex: 1
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
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default Login;
