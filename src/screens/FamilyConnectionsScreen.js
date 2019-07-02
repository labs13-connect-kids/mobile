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
import { sendEvent } from './../helpers/createEvent';
import FamilyConnectionsModal from './../components/FamilyConnectionsModal/FamilyConnectionsModal';
import constants from '../helpers/constants';
class FamilyConnectionsScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Family Connections', navigation);

  state = {
    modalVisible: false,
    message: false,
    email: ''
  };

  openModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  trackInterest = trackingEmail => {
    let email = this.props.email ? this.props.email : trackingEmail;
    sendEvent(email, 'click', 'request-familyconnections');
    this.setState({
      modalVisible: false,
      email,
      message: true
    });
    this.startClearState();
  };

  startClearState = () => {
    setTimeout(() => {
      this.setState({ message: false, email: '' });
    }, 3000);
  };

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={this.closeModal}
            >
              <FamilyConnectionsModal
                trackInterest={this.trackInterest}
                closeModal={this.closeModal}
                startRegister={this.startRegister}
                email={this.props.email}
              />
            </Modal>
          </View>
          <ScrollView>
            <Text style={styles.mainText}>
              Learn about a revolutionary way to discover and engage extended
              families for at-risk foster youth.
            </Text>
            <View style={styles.videoContainer}>
              <WebView
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
              />
            </View>

            <Button style={styles.button} block onPress={this.openModal}>
              <Text style={styles.buttonText}>
                I Want To Access Family Connections
              </Text>
            </Button>
            {this.state.message && (
              <Text style={styles.thankyouMessage}>
                Thank you for showing interest, {this.state.email} has been
                added to our list.
              </Text>
            )}
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
  },
  videoContainer: { height: 300, marginBottom: 30 },
  thankyouMessage: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    textTransform: 'uppercase',
    backgroundColor: constants.highlightColor
  }
});

const mapStateToProps = state => {
  // console.log('redux state FCS: ', state);
  return {
    email: state.auth.user ? state.auth.user.email : null
  };
};

export default connect(mapStateToProps)(FamilyConnectionsScreen);
