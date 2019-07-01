import React from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import SocialWorkerModal from './SocialWorkerModal';
import VideoAgreeModal from './VideoAgreeModal';
import VideoModal from './VideoModal';
import constants from '../../helpers/constants';
import { sendEvent } from './../../helpers/createEvent';

const RegisterModalsContainer = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <View style={styles.marginTop}>
        <View>
          {props.modalVisible && !props.videoAgree && !props.videoVisible && (
            <SocialWorkerModal
              modalVisible={props.modalVisible}
              advanceModal={props.setAgreeModalVisible}
              setModalVisible={props.setModalVisible}
              sendEvent={sendEvent}
            />
          )}
          {!props.videoVisible && props.videoAgree && (
            <VideoAgreeModal
              modalVisible={props.modalVisible}
              advanceModal={props.setVideoPlayerModalVisible}
              setModalVisible={props.setModalVisible}
              onLogin={props.onLogin}
              sendEvent={sendEvent}
            />
          )}
          {!props.videoAgree && props.videoVisible && (
            <VideoModal
              setModalVisible={props.setModalVisible}
              onLogin={props.onLogin}
              sendEvent={sendEvent}
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
