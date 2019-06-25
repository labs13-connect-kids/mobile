import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

const FamilyConnectionsModal = props => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.modalHeaderStyle}>
          Interested in staying updated?
        </Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            props.toggleModal();
          }}
        >
          <Text style={[styles.btnText, styles.closeBtn]}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.modalTextStyle}>
        Our Family Connections feature is coming soon. If you'd like to be added
        to our email list to be informed about updates, press the Yes button
        below.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.yesButton}
          block
          onPress={async () => {
            await props.trackInterest();
          }}
        >
          <Text style={styles.btnText}>Yes, add my email to the list</Text>
        </Button>
        <Button style={styles.noButton} block onPress={props.toggleModal}>
          <Text style={styles.btnText}>Don't add my email</Text>
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
    backgroundColor: 'red',
    borderRadius: 3,
    marginLeft: 'auto'
  },
  closeBtn: {
    padding: 5
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

export default FamilyConnectionsModal;
