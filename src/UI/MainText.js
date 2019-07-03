import React from 'react';
import { Text, StyleSheet } from 'react-native';
import constants from '../helpers/constants';

const CustomText = props => {
  // by spreading props and styles in an array, we can pass it custom styles to override or add to these base styles when we use this component
  return (
    <Text {...props} style={[styles.mainText, { ...props.style }]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontFamily: constants.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20
  }
});

export default CustomText;
