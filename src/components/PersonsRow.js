import React from 'react';
import { Text, Card, Body, CardItem, Grid } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import PersonInfoHeader from './Person/PersonInfoHeader';

import constants from '../helpers/constants';

export default function PersonsRow({ handlePress, item }) {
  return (
    <Card>
      <CardItem button onPress={handlePress}>
        <Grid style={styles.rowContainer}>
          <PersonInfoHeader item={item} listItem />
        </Grid>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row'
  },
  rowImage: {
    marginRight: 10,
    width: 75,
    height: 75
  },
  nameText: {
    fontSize: 20,
    color: '#508DB3',
    fontFamily: constants.fontFamily,
    marginBottom: 5
  },
  informationText: {
    fontFamily: constants.fontFamily,
    fontSize: 14
  }
});
