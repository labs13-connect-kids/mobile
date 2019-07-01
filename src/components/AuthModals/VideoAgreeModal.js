import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

const VideoAgreeModal = props => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.modalHeaderStyle}>
          Two minutes for better results
        </Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            props.setModalVisible(false);
          }}
        >
          <Text style={[styles.btnText, styles.closeBtn]}>❌</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.modalTextStyle}>
        Before you start, we'd like you to watch a two minute video so that you
        know everything about People Search.
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.yesButton} block onPress={props.advanceModal}>
          <Text style={styles.btnText}>Show me the video</Text>
        </Button>
        <Button
          style={styles.noButton}
          block
          onPress={() => {
            props.setModalVisible(false);
            props.onLogin();
            props.sendEvent(null, 'click', 'do-not-watch-video');
          }}
        >
          <Text style={styles.btnText}>Skip the video</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    height: 300,
    margin: 30
  },
  headerContainer: {
    borderBottomColor: constants.highlightColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    width: Dimensions.get('window').width
  },
  yesButton: {
    backgroundColor: constants.highlightColor,
    marginBottom: 10
  },
  noButton: {
    backgroundColor: '#6C757D',
    marginBottom: 10
  },
  close: {
    marginLeft: 'auto'
  },
  closeBtn: {
    padding: 5,
    color: '#000'
  },
  btnText: {
    color: '#fff'
  },
  modalHeaderStyle: {
    color: constants.highlightColor,
    fontSize: 20,
    fontFamily: constants.fontFamily
  },
  modalTextStyle: {
    fontFamily: constants.fontFamily,
    paddingHorizontal: 20,
    fontSize: 18,
    lineHeight: 25
  },
  logo: {
    width: Dimensions.get('window').width - 40,
    height: 100
  },
  buttonContainer: {
    padding: 20,
    borderTopColor: constants.highlightColor,
    borderTopWidth: 1,
    marginTop: 20
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0,
    marginBottom: 30
  }
});

export default VideoAgreeModal;
