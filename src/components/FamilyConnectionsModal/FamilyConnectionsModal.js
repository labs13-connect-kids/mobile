import React, { Component } from 'react';
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
import { Input } from 'native-base';

class FamilyConnectionsModal extends Component {
  state = {
    email: ''
  };

  handleInput = text => {
    this.setState({
      email: text
    });
  };

  render() {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.modalHeaderStyle}>
            Interested in staying updated?
          </Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              this.props.toggleModal();
            }}
          >
            <Text style={styles.closeBtn}>❌</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.modalTextStyle}>
          Our Family Connections feature is coming soon. If you'd like to be
          added to our email list to be informed about updates, press the Yes
          button below.
        </Text>
        <View style={styles.buttonContainer}>
          {!this.props.email && (
            <Input
              style={styles.textInput}
              onChangeText={text => this.handleInput(text)}
              placeholder="sample@email.com"
            />
          )}
          <Button
            style={styles.yesButton}
            block
            onPress={async () => {
              trackingEmail = this.state.email;
              await this.props.trackInterest(trackingEmail);
            }}
          >
            <Text style={styles.btnText}>Yes, add my email to the list</Text>
          </Button>
          <Button
            style={styles.noButton}
            block
            onPress={this.props.toggleModal}
          >
            <Text style={styles.btnText}>Don't add my email</Text>
          </Button>
        </View>
      </>
    );
  }
}

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
    width: Dimensions.get('window').width,
    marginTop: Platform.OS === 'ios' ? 40 : null
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
    marginTop: 20,
    height: 210
  },
  textInput: {
    borderColor: '#64aab8',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    marginBottom: 10
  }
});

export default FamilyConnectionsModal;
