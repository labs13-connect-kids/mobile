import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import headerConfig from '../helpers/headerConfig';
import { sendEvent } from './../helpers/createEvent';
import FamilyConnectionsModal from './../components/FamilyConnectionsModal/FamilyConnectionsModal';
import Video from '../components/Video/Video';
import constants from '../helpers/constants';
import MainText from '../UI/MainText';
import ScreenContainer from '../UI/ScreenContainer';
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
      <ScreenContainer>
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
            <MainText>
              Learn about a revolutionary way to discover and engage extended
              families for at-risk foster youth.
            </MainText>

            <Video uri={constants.familyConnectionsURI} />

            <Button style={styles.button} block onPress={this.openModal}>
              <Text style={styles.buttonText}>
                I Want To Access Family Connections
              </Text>
            </Button>

            {this.state.message && (
              <View style={styles.messageContainer}>
                <Text style={styles.thankyouMessage}>
                  Thank you for showing interest, {this.state.email} has been
                  added to our list.
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
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
    textTransform: 'uppercase'
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: constants.highlightColor,
    borderRadius: 5
  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.user ? state.auth.user.email : null
  };
};

export default connect(mapStateToProps)(FamilyConnectionsScreen);
