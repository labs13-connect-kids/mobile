import React, { Component } from 'react';
import { Modal, View, Alert, StyleSheet, Dimensions } from 'react-native';
import VideoAgreeModal from './../components/AuthModals/VideoAgreeModal';
import VideoModal from '../components/AuthModals/VideoModal';
import SocialWorkerModal from '../components/AuthModals/SocialWorkerModal';
import constants from '../helpers/constants';
import headerConfig from '../helpers/headerConfig';
import LoginWithAuth0 from '../components/Authentication/loginWithAuth0';
class AuthenticationView extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Login / Register', navigation);
  state = {
    modalVisible: false,
    videoAgree: false,
    videoVisible: false
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      videoAgree: false,
      videoVisible: false
    });
  };

  advanceModal = () => {
    if (!this.state.videoAgree) {
      this.setState({
        videoAgree: true
      });
    } else {
      this.setState({
        videoAgree: false,
        videoVisible: true
      });
    }
  };

  render() {
    console.log('auth view props: ', this.props);
    return (
      <View style={styles.registerContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.marginTop}>
            <View>
              {this.state.modalVisible &&
                !this.state.videoAgree &&
                !this.state.videoVisible && (
                  <SocialWorkerModal
                    modalVisible={this.state.modalVisible}
                    advanceModal={this.advanceModal}
                    setModalVisible={this.setModalVisible}
                  />
                )}
              {!this.state.videoVisible && this.state.videoAgree && (
                <VideoAgreeModal
                  modalVisible={this.state.modalVisible}
                  advanceModal={this.advanceModal}
                  setModalVisible={this.setModalVisible}
                  onLogin={this.props.onLogin}
                />
              )}
              {!this.state.videoAgree && this.state.videoVisible && (
                <VideoModal
                  setModalVisible={this.setModalVisible}
                  onLogin={this.props.onLogin}
                />
              )}
            </View>
          </View>
        </Modal>

        <View>
          <LoginWithAuth0 setModalVisible={this.setModalVisible} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    marginHorizontal: 5
  },
  marginTop: {
    marginTop: 22
  },
  logo: {
    width: Dimensions.get('window').width - 40,
    height: 100
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  btnText: {
    color: '#fff'
  }
});

export default AuthenticationView;
