import React, { Component } from 'react';
import { SafeAreaView, Text, Linking, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import Video from '../components/Video/Video';
import MainText from '../UI/MainText';
import NavigationButton from '../UI/NavigationButton';
import ScreenContainer from '../UI/ScreenContainer';
import authHelpers from '../helpers/authHelpers';

class BestPracticesScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Best Practices', navigation);

  async componentDidMount() {
    let confirmedUser = await AsyncStorage.getItem('auth0Data');
    if (confirmedUser) {
      confirmedUser = JSON.parse(confirmedUser);
      const expiresAt = await AsyncStorage.getItem('expiresAt');
      const isAuthenticated = new Date().getTime() < JSON.parse(expiresAt);
      if (isAuthenticated) {
        const jwtToken = confirmedUser.params.id_token;
        const decoded = jwtDecode(jwtToken);
        this.props.setUserCreds(decoded, confirmedUser);
      } else {
        // re-login
        authHelpers.handleLogin(
          authHelpers._loginWithAuth0,
          this.props.setUserCreds
        );
      }
    }
  }

  render() {
    return (
      <ScreenContainer>
        <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <ScrollView>
            <MainText>
              Connect Our Kids makes free tools for social workers engaged in
              permanency searches for foster kids.
            </MainText>

            <Text
              style={{
                color: constants.highlightColor,
                fontWeight: 'bold',
                marginBottom: 5
              }}
            >
              Watch the video below to learn more about the free tools and
              resources in this app.
            </Text>

            <Video uri={constants.bestPracticesURI} />

            <NavigationButton
              titleText="People Search"
              subTitleText="Find Contact Information for Anyone"
              handlePress={() => this.props.navigation.navigate('PeopleSearch')}
            />
            <NavigationButton
              titleText="Family Connections"
              subTitleText="Family Trees for Permanency"
              handlePress={() =>
                this.props.navigation.navigate('FamilyConnections')
              }
            />
            <NavigationButton
              titleText="Resources"
              subTitleText="Useful Materials and Information"
              handlePress={() => Linking.openURL('https://connectourkids.org')}
              style={{ marginBottom: 20 }}
            />
          </ScrollView>
        </SafeAreaView>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { setUserCreds, logOut }
)(BestPracticesScreen);
