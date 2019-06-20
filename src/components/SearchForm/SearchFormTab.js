import React from 'react';
import { StyleSheet } from 'react-native';
import { Tab } from 'native-base';
import constants from '../../helpers/constants';

const SearchFormTab = props => {
  return (
    <Tab
      {...props}
      heading={props.heading}
      activeTextStyle={styles.activeTextStyle}
      style={[styles.nameInput, { color: '#64aab8' }]}
      textStyle={styles.textStyle}
    >
      {props.children}
    </Tab>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    flexDirection: 'row'
  },
  activeTextStyle: {
    color: '#000',
    fontFamily: constants.fontFamily,
    fontSize: 16
  },
  textStyle: {
    color: '#64aab8',
    fontFamily: constants.fontFamily,
    fontSize: 16
  }
});

export default SearchFormTab;
