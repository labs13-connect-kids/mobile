import React from 'react';
import { Linking, Text, TouchableHighlight, View } from 'react-native';
import {
  isName,
  isEmail,
  isAddress,
  isPhone,
  isUrl,
} from '../../helpers/inputValidators';

const handleOpenEmail = () => {
  Linking.canOpenURL('mailto:support@connectourkids.org:')
    .then(supported => {
      if (!supported) {
        console.log('Cant handle url');
      } else {
        return Linking.openURL('mailto:support@connectourkids.org');
      }
    })
    .catch(err => {
      console.error('An error occurred', err);
    });
};

const ErrorMessage = (props) => {
  renderMessage = () => {
    if (props.data.inputKey && props.data.inputValue) {
      if (props.data.inputKey === "name") {
        // if (splitValue === 1){
        if (!isName(props.data.inputValue)) {
          return <Text style={{ color: '#856404' }}>Please enter both a first and last name</Text>
        }
      }
      else if (props.data.inputKey === "email") {
        if (!isEmail(props.data.inputValue)) {
          return <Text style={{ color: '#856404' }}>Please enter a valid email address</Text>
        }
      }
      else if (props.data.inputKey === "address") {
        if (!isAddress(props.data.inputValue)) {
          return <Text style={{ color: '#856404' }}>Addresses should contain house numbers, street names, city, and state</Text>
        }
      }
      else if (props.data.inputKey === "phone") {
        if (!isPhone(props.data.inputValue)) {
          return <Text style={{ color: '#856404' }}>Phone numbers must not contain alpha or special symbols</Text>
        }
      }
      else if (props.data.inputKey === "url") {
        if (!isUrl(props.data.inputValue)) {
          return <Text style={{ color: '#856404' }}>Please enter a valid URL</Text>
        }
      }
    } else {
      console.log('fetching...')
    }


    if (props.query) {
      if (!props.query.names) {
        // if (isName(props.query.names[0]["display"])) {
        if (props.query.names[0]["display"]) {
          return <Text>Sorry, no results were found for your search. Check the spelling and try again. </Text>
        }
      }
      else if (!props.query.emails) {
        // if (isEmail(props.query.emails[0]["address"])) {
        if (props.query.emails[0]["address"]) {
          return <Text>Sorry, no results were found for your search. Check the spelling and try again.</Text>
        }
      }

      else if (!props.query.addresses) {
        // if (isAddress(props.query.addresses[0]["display"])) {
        if (props.query.addresses[0]["display"]) {
          return (<Text style={{ color: '#856404' }}>There was an error during the search. Please try again later, or <Text style={{ color: '#508db3' }} onPress={handleOpenEmail}>Contact Support.</Text>
          </Text>)
        }
      }
      else if (!props.query.phones) {
        // if (isPhone(props.query.phones[0]["number"])) {
        if (props.query.phones[0]["number"]) {
          return (<Text style={{ color: '#856404' }}>There was an error during the search. Please try again later, or <Text style={{ color: '#508db3' }} onPress={handleOpenEmail}>Contact Support.</Text>
          </Text>)
        }
      }
      // else if (isUrl(props.query.urls[0]["@source_id"])) {
      //   return <Text style={{ color: '#856404' }}>There was an error during the search. Please try again later, or <Text style={{ color: '#508db3' }} onPress={handleOpenEmail}>Contact Support.</Text>
      //  </Text>
      // }
    }
    else {
      console.log("ERROR in ErrorMessage.js")
    }
  }
  return (
    <View style={{ backgroundColor: '#fff3cd', padding: 15 }}>
      {this.renderMessage()}
    </View>
  )
};

export default ErrorMessage;