import React from 'react';
import { Linking, Text, TouchableHighlight, View } from 'react-native';

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

const ErrorMessage = () => {
  return (
    <View>
      <Text>
        There was an error during the search. Please try again later or:
      </Text>
      <TouchableHighlight onPress={handleOpenEmail}>
        <Text>Contact Support.</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ErrorMessage;
