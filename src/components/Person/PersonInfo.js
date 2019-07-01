import React from 'react';
import { StyleSheet } from 'react-native';
import { Grid } from 'native-base';
import PersonInfoHeader from './PersonInfoHeader';
import PersonInfoRow from './PersonInfoRow';

const PersonInfo = ({ item, startRegister, isLoggedIn, showConModal }) => {
  return (
    <Grid style={styles.container}>
      <PersonInfoHeader item={item} />
      <PersonInfoRow
        showConModal={showConModal}
        startRegister={startRegister}
        item={item}
        itemKey="emails"
        itemValue="address"
        title="Emails"
      />
      <PersonInfoRow
        showConModal={showConModal}
        startRegister={startRegister}
        item={item}
        itemKey="phones"
        itemValue="display"
        title="Phone Numbers"
      />
      <PersonInfoRow
        showConModal={showConModal}
        startRegister={startRegister}
        item={item}
        itemKey="addresses"
        itemValue="display"
        title="Addresses"
      />
      {/* This person info row also needs to pass in a url */}
      {isLoggedIn && (
        <PersonInfoRow
          showConModal={showConModal}
          item={item}
          itemKey="urls"
          itemValue="@domain"
          title="Websites"
        />
      )}
      <PersonInfoRow
        showConModal={showConModal}
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
