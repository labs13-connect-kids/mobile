import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import logo from '../../assets/logo.png';
import VideoAgreeModal from './../components/AuthModals/VideoAgreeModal';
import VideoModal from '../components/AuthModals/VideoModal';
import SocialWorkerModal from '../components/AuthModals/SocialWorkerModal';

class AuthenticationView extends Component {
  state = {
    modalVisible: true,
    videoAgree: false,
    videoVisible: false
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
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
              {/* modals rendered based on user feedback */}
              {/* modal 1 */}
              {this.state.modalVisible &&
                !this.state.videoAgree &&
                !this.state.videoVisible && (
                  <SocialWorkerModal
                    modalVisible={this.state.modalVisible}
                    advanceModal={this.advanceModal}
                    setModalVisible={this.setModalVisible}
                  />
                )}
              {/* modal 2 */}
              {!this.state.videoVisible && this.state.videoAgree && (
                <VideoAgreeModal
                  modalVisible={this.state.modalVisible}
                  advanceModal={this.advanceModal}
                  setModalVisible={this.setModalVisible}
                />
              )}
              {/* modal 3 */}
              {!this.state.videoAgree && this.state.videoVisible && (
                <VideoModal setModalVisible={this.setModalVisible} />
              )}
            </View>
          </View>
        </Modal>
        <Image source={logo} style={styles.logo} />
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
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
