import React from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import SocialWorkerModal from './SocialWorkerModal';
import VideoAgreeModal from './VideoAgreeModal';
import VideoModal from './VideoModal';
import constants from '../../helpers/constants';

const RegisterModalsContainer = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.marginTop}>
        <View>
          {props.modalVisible && !props.videoAgree && !props.videoVisible && (
            <SocialWorkerModal
              modalVisible={props.modalVisible}
              advanceModal={props.setAgreeModalVisible}
              setModalVisible={props.setModalVisible}
            />
          )}
          {!props.videoVisible && props.videoAgree && (
            <VideoAgreeModal
              modalVisible={props.modalVisible}
              advanceModal={props.setVideoPlayerModalVisible}
              setModalVisible={props.setModalVisible}
              onLogin={props.onLogin}
            />
          )}
          {!props.videoAgree && props.videoVisible && (
            <VideoModal
              setModalVisible={props.setModalVisible}
              onLogin={props.onLogin}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default RegisterModalsContainer;
