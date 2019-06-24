import React from 'react';
import { StyleSheet } from 'react-native';
import { Grid } from 'native-base';
import PersonInfoHeader from './PersonInfoHeader';
import PersonInfoRow from './PersonInfoRow';

const PersonInfo = ({ item }) => {
  return (
    <Grid style={styles.container}>
      <PersonInfoHeader item={item} />
      <PersonInfoRow
        item={item}
        itemKey="emails"
        itemValue="address"
        title="Emails"
      />
      <PersonInfoRow
        item={item}
        itemKey="phones"
        itemValue="display"
        title="Phone Numbers"
      />
      <PersonInfoRow
        item={item}
        itemKey="addresses"
        itemValue="display"
        title="Addresses"
      />
      {/* This person info row also needs to pass in a url */}
      <PersonInfoRow
        item={item}
        itemKey="urls"
        itemValue="@domain"
        title="Websites"
      />
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default PersonInfo;
