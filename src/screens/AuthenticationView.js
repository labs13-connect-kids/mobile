import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
import VideoAgreeModal from './../components/AuthModals/VideoAgreeModal';
import VideoModal from '../components/AuthModals/VideoModal';
import SocialWorkerModal from '../components/AuthModals/SocialWorkerModal';

class AuthenticationView extends Component {
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
    return (
      <View style={styles.marginTop}>
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
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 22
  },
  logo: {
    width: Dimensions.get('window').width - 40,
    height: 100
  }
});
export default AuthenticationView;
