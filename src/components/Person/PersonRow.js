import React from 'react';
import { Card, CardItem, Grid } from 'native-base';
import { StyleSheet } from 'react-native';
import PersonInfoHeader from './PersonInfoHeader';

const PersonRow = ({ handlePress, item }) => {
  return (
    <Card>
      <CardItem button onPress={handlePress}>
        <Grid style={styles.rowContainer}>
          <PersonInfoHeader item={item} listItem />
        </Grid>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row'
  }
});

export default PersonRow;
