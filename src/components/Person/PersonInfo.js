import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Grid } from 'native-base';
import PersonInfoHeader from './PersonInfoHeader';
import PersonInfoRow from './PersonInfoRow';

const PersonInfo = ({ item, startRegister, isLoggedIn }) => {
  return (
    <Grid style={styles.container}>
      <PersonInfoHeader item={item} />
      <PersonInfoRow
        startRegister={startRegister}
        item={item}
        itemKey="emails"
        itemValue="address"
        title="Emails"
      />
      <PersonInfoRow
        startRegister={startRegister}
        item={item}
        itemKey="phones"
        itemValue="display"
        title="Phone Numbers"
      />
      <PersonInfoRow
        startRegister={startRegister}
        item={item}
        itemKey="addresses"
        itemValue="display"
        title="Addresses"
      />
      {/* This person info row also needs to pass in a url */}
      {isLoggedIn && (
        <PersonInfoRow
          item={item}
          itemKey="urls"
          itemValue="@domain"
          title="Websites"
        />
      )}
      <PersonInfoRow
        startRegister={startRegister}
        item={item}
        itemKey="relationships"
        itemValue="names"
        title="Relationships"
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
