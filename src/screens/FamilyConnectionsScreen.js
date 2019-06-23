import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  WebView,
  Platform,
  Modal
} from 'react-native';
import { Container, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import headerConfig from '../helpers/headerConfig';
import { trackEmail } from './../store/actions';
import FamilyConnectionsModal from './../components/FamilyConnectionsModal/FamilyConnectionsModal';
import LoginWithAuth0 from '../components/Authentication/loginWithAuth0';
import constants from '../helpers/constants';
class FamilyConnectionsScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Family Connections', navigation);

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  trackInterest = () => {
    this.props.trackEmail({ emailAddress: this.props.email });
    this.toggleModal();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View>
            {this.props.email ? (
              <FamilyConnectionsModal
                trackInterest={this.trackInterest}
                toggleModal={this.toggleModal}
              />
            ) : (
              <SafeAreaView style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Please take a moment to login or register before continuing
                </Text>
                <LoginWithAuth0 />
              </SafeAreaView>
            )}
          </View>
        </Modal>
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.mainText}>
              Learn about a revolutionary way to discover and engage extended
              families for at-risk foster youth.
            </Text>
            <View style={{ height: 300, marginBottom: 30 }}>
              <WebView
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
              />
            </View>

            <Button style={styles.button} block onPress={this.toggleModal}>
              <Text style={styles.buttonText}>
                I Want To Access Family Connections
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  mainText: {
    fontFamily: constants.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  red: {
    backgroundColor: 'red'
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  // const { email } = state.auth.user;
  return {
    email: state.auth.user ? state.auth.user.email : null
  };
};

export default connect(
  mapStateToProps,
  { trackEmail }
)(FamilyConnectionsScreen);
