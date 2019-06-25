import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  WebView,
  Platform,
  Linking
} from 'react-native';
import { Container, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
// import LoginWithAuth0 from '../components/Authentication/loginWithAuth0';
import { AsyncStorage } from 'react-native';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
// import ErrorMessage from '../components/Messages/ErrorMessage';

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
    console.log('BEST PRACTICES PROPS', this.props);
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.mainText}>
              Connect Our Kids makes free tools for social workers engaged in
              permanency searches for foster kids.
            </Text>
            <Text style={styles.videoText}>
              Watch the video below to learn more about the free tools and
              resources in this app.
            </Text>
            <View style={styles.videoContainer}>
              <WebView
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
              />
            </View>
            <Button
              style={[styles.button, styles.primaryBtn]}
              block
              onPress={() => this.props.navigation.navigate('PeopleSearch')}
            >
              <Text style={[styles.primaryBtnText, styles.lightBtn]}>
                People Search
              </Text>
              <Text style={[styles.buttonText, styles.lightBtn]}>
                Find Contact Information for Anyone
              </Text>
            </Button>
            <Button
              style={styles.button}
              bordered
              block
              onPress={() =>
                this.props.navigation.navigate('FamilyConnections')
              }
            >
              <Text style={styles.primaryBtnText}>Family Connections</Text>
              <Text style={styles.buttonText}>Family Trees for Permanency</Text>
            </Button>
            <Button
              style={[styles.button, styles.lastBtn]}
              bordered
              block
              onPress={() => Linking.openURL('https://connectourkids.org')}
            >
              <Text style={styles.primaryBtnText}>Resources</Text>
              <Text style={styles.buttonText}>
                Useful Materials and Information
              </Text>
            </Button>
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
    fontSize: 14,
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
