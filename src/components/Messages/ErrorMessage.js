import React from 'react';
import { Linking, Text, TouchableHighlight, View } from 'react-native';
import {
  isName,
  isEmail,
  isAddress,
  isPhone,
  isUrl,
  isCityState
} from '../../helpers/inputValidators';

// const handleOpenEmail = () =>
//   Linking.openURL('mailto:support@connectourkids.org');

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
    if (props.data) {
      if (isName(props.data.names[0].first && props.data.names[0].last)) {
        return (<Text style={{ color: '#856404' }}>There was an error during the search. Please try again later, or <Text style={{ color: '#508db3' }} onPress={handleOpenEmail}>Contact Support.</Text>
        </Text>)
      } else if(isName(props.data.names[0].first)){
        return <Text>Please enter both a first and last name</Text>
      }
    }
  }
  console.log("props from ErrorMessage", props.data)
  return (
    <View style={{ backgroundColor: '#fff3cd', padding: 15 }}>
      {this.renderMessage()}

      {/*<Text style={{ color: '#856404' }}>There was an error during the search. Please try again later, or <Text style={{ color: '#508db3' }} onPress={handleOpenEmail}>Contact Support.</Text>
  </Text>*/}
    </View>
  );
};

export default ErrorMessage;