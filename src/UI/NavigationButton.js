import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import constants from '../helpers/constants';

const NavigationButton = ({ handlePress, subTitleText, style, titleText }) => {
  return (
    <Button
      style={[styles.button, styles.primaryBtn, { ...style }]}
      block
      onPress={handlePress}
    >
      <Text style={[styles.primaryBtnText, styles.lightBtn]}>{titleText}</Text>
      <Text style={[styles.buttonText, styles.lightBtn]}>{subTitleText}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  mainText: {
    fontFamily: constants.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 5
  },
  videoText: {
    color: constants.highlightColor,
    fontWeight: 'bold',
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  },
  primaryBtn: {
    backgroundColor: constants.highlightColor
  },
  primaryBtnText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: constants.highlightColor,
    flex: 1
  },
  buttonText: {
    color: constants.highlightColor,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  lightBtn: {
    color: '#fff'
  },
  lastBtn: {
    marginBottom: 50
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

export default NavigationButton;
