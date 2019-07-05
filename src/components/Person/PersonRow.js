import React from 'react';
import { Card, CardItem, Grid } from 'native-base';
import { StyleSheet } from 'react-native';
import PersonInfoHeader from './PersonInfoHeader';

const PersonRow = ({ handlePress, item }) => {
  return (
    <Card
      style={{
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
        shadowOpacity: 0,
        borderColor: 'transparent'
      }}
    >
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
