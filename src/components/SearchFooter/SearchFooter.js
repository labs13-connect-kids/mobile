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

const SearchFooter = props => {
  return (
    <View style={styles.footerContainer}>
      <TouchableWithoutFeedback
        style={styles.fullwidth}
        onPress={() => Linking.openURL('https://connectourkids.org')}
      >
        <Text style={[styles.footerLink, { marginBottom: 5 }]}>
          Copyright Connect Our Kids 2019
        </Text>
      </TouchableWithoutFeedback>
      <View style={styles.row}>
        <TouchableWithoutFeedback
          style={styles.fullwidth}
          onPress={() => {
            sendEvent(
              props.isLoggedIn ? props.user.email : 'anonymous@unknown.org',
              'click',
              'terms'
            );
            props.openModal();
            props.controlModal('terms', true);
            props.controlModal('privacy', false);
          }}
        >
          <Text style={styles.footerLink}>Terms and Conditions</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.fullwidth}
          onPress={() => {
            sendEvent(
              props.isLoggedIn ? props.user.email : 'anonymous@unknown.org',
              'click',
              'privacy'
            );
            props.openModal();
            props.controlModal('terms', false);
            props.controlModal('privacy', true);
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
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
    backgroundColor: '#f6f6f6',
    flex: 1
  },
  footerLink: {
    color: constants.highlightColor,
    fontFamily: constants.fontFamily,
    borderBottomWidth: 1,
    borderBottomColor: constants.highlightColor,
    fontSize: 12
  },
  fullwidth: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignSelf: 'flex-end'
  }
});

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
};

export default connect(mapStateToProps)(SearchFooter);
