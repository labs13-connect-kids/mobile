import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, Linking } from 'react-native';
import { Container } from 'native-base';
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

class BestPracticesScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Best Practices', navigation);
  async componentDidMount() {
    // NOTE: TODO check for JWT expiration to confirm if logged in
    let confirmedUser = await AsyncStorage.getItem('auth0Data');

    if (confirmedUser) {
      confirmedUser = JSON.parse(confirmedUser);
      const jwtToken = confirmedUser.params.id_token;
      const decoded = jwtDecode(jwtToken);
      this.props.setUserCreds(decoded, confirmedUser);
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <MainText>
              Connect Our Kids makes free tools for social workers engaged in
              permanency searches for foster kids.
            </MainText>

            <Text style={styles.videoText}>
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
              style={styles.lastBtn}
            />
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
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
  lastBtn: {
    marginBottom: 50
  }
});

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
