import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent';

const SearchFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableWithoutFeedback
        style={styles.fullwidth}
        onPress={() => Linking.openURL('https://connectourkids.org')}
      >
        <Text style={styles.footerLink}>Copyright Connect Our Kids 2019</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.fullwidth}
        onPress={() => {
          sendEvent(
            this.props.isLoggedIn
              ? this.props.user.email
              : 'anonymous@unknown.org',
            'click',
            'terms'
          );
          Linking.openURL('https://search.connectourkids.org/terms');
        }}
      >
        <Text style={styles.footerLink}>Terms and Conditions</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.fullwidth}
        onPress={() => {
          sendEvent(
            this.props.isLoggedIn
              ? this.props.user.email
              : 'anonymous@unknown.org',
            'click',
            'privacy'
          );
          Linking.openURL('https://search.connectourkids.org/privacy');
        }}
      >
        <Text style={styles.footerLink}>Privacy Policy</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.fullwidth}
        onPress={() =>
          Linking.openURL(
            'mailto:support@connectourkids.org?subject=People%20Search%20Help'
          )
        }
      >
        <Text style={styles.footerLink}>Contact Support</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 5,
    alignItems: 'center'
  },
  footerLink: {
    color: constants.highlightColor,
    fontFamily: constants.fontFamily,
    borderBottomWidth: 1,
    borderBottomColor: constants.highlightColor,
    marginBottom: 5
  },
  fullwidth: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps)(SearchFooter);
