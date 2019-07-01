import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  Dimensions
} from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

const SocialWorkerModal = props => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.modalHeaderStyle}>
          Do you work with foster kids?
        </Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            props.setModalVisible(!props.modalVisible);
          }}
        >
          <Text style={[styles.btnText, styles.closeBtn]}>❌</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.modalTextStyle}>
        People Search is for social workers and those that work directly with
        foster kids. If you do not work with foster kids, we'd love to tell you
        more about what we do.
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.yesButton} block onPress={props.advanceModal}>
          <Text style={styles.btnText}>Yes, I work with foster kids</Text>
        </Button>
        <Button
          style={styles.noButton}
          block
          onPress={() => {
            props.sendEvent(null, 'click', 'i-am-not-a-social-worker');
            Linking.openURL('https://connectourkids.org');
          }}
        >
          <Text style={styles.btnText}>Nope, that's not me</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: constants.highlightColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
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
  buttonContainer: {
    padding: 20,
    borderTopColor: constants.highlightColor,
    borderTopWidth: 1,
    marginTop: 20
  }
});

export default SocialWorkerModal;
