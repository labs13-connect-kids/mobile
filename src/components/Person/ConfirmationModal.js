import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';
import { sendEvent, createOptions } from '../../helpers/createEvent';

export const ConfirmationModal = ({
  toggleModal,
  data,
  type,
  navigation,
  setData,
  user,
  index
}) => {
  const handlePressDirections = data => {
    let daddr = data;
    // console.log( daddr );
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  };

  return (
    <View style={options.container}>
      {type === 'email' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>Send Email or Search?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to send an email, or perform a search?
          </Text>
        </View>
      ) : null}

      {type === 'phone' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>Call or Search?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to call this number, or perform a search? Calling
            requires a device capable of dialing phone numbers.
          </Text>
        </View>
      ) : null}

      {type === 'address' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>View or Search?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to view this address on a map, or perform a search on
            it?
          </Text>
        </View>
      ) : null}

      {type === 'address404' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>View?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to view this address on a map?
          </Text>
        </View>
      ) : null}

      {type === 'url' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>View or Search?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to view this URL, or perform a search on it?
          </Text>
        </View>
      ) : null}

      {type === 'name' ? (
        <View>
          <View style={options.border}>
            <Text style={options.header}>View Relationship or Search?</Text>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={options.button}>❌</Text>
            </TouchableOpacity>
          </View>
          <Text style={options.question}>
            Would you like to view this relation?
          </Text>
        </View>
      ) : null}

      <View style={options.buttonContainer}>
        {type === 'name' ? null : (
          <Button
            info
            style={options.blueButton}
            onPress={() => {
              if (type === 'email') {
                // console.log( 'EMAIL TO:', data.address )
                let options = createOptions(null, 'email', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_email_send',
                  null,
                  options
                );
                Linking.openURL(`mailto:${data.address}`);
              }

              if (type === 'phone') {
                // console.log( 'CALL TO:', data.number )
                let options = createOptions(null, 'phone', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_phone_call',
                  null,
                  options
                );
                Linking.openURL(`tel:${data.number}`);
              }

              if (type === 'address') {
                // console.log( 'MAP TO:', data )
                let options = createOptions(null, 'address', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_address_view',
                  null,
                  options
                );
                handlePressDirections(data);
              }

              if (type === 'address404') {
                // console.log('MAP TO:', data)
                let options = createOptions(null, 'address', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_address_view',
                  null,
                  options
                );
                handlePressDirections(data);
              }

              if (type === 'url') {
                // console.log( 'URL TO:', data )
                let options = createOptions(null, 'url', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_url_view',
                  null,
                  options
                );
                Linking.openURL(`${data.url}`);
              }

              if (type === 'name') {
                // console.log( 'RELATIONSHIP TO:', data )
                let options = createOptions(null, 'relationship', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_possible_person',
                  null,
                  options
                );
                Linking.openURL(`${data}`);
              }
            }}
          >
            {type === 'email' ? (
              <Text style={{ color: 'white' }}>Send Email</Text>
            ) : null}

            {type === 'phone' ? (
              <Text style={{ color: 'white' }}>Call this number</Text>
            ) : null}

            {type === 'address' ? (
              <Text style={{ color: 'white' }}>View on map</Text>
            ) : null}

            {type === 'address404' ? (
              <Text style={{ color: 'white' }}>View on map</Text>
            ) : null}

            {type === 'url' ? (
              <Text style={{ color: 'white' }}>View the URL</Text>
            ) : null}
          </Button>
        )}

        {type === 'address404' ? null : (
          <Button
            info
            style={options.greyButton}
            onPress={() => {
              if (type === 'email') {
                info = data.address;
                // console.log('SEARCH EMAIL:', data.address);
                let options = createOptions(null, 'email', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_email_search',
                  null,
                  options
                );
                navigation.goBack();
                setData(info, type);
              }

              if (type === 'phone') {
                info = data.display;
                // console.log('SEARCH PHONE:', data.number);
                let options = createOptions(null, 'phone', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_phone_search',
                  null,
                  options
                );
                navigation.navigate('PeopleSearch');
                setData(info, type);
              }

              if (type === 'address') {
                info = data;
                // console.log('SEARCH MAP TO:', data);
                let options = createOptions(null, 'address', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_address_search',
                  null,
                  options
                );
                navigation.navigate('PeopleSearch');
                setData(info, type);
              }

              if (type === 'url') {
                info = data.url;
                // console.log('SEARCH URL:', data);
                let options = createOptions(null, 'url', index);
                sendEvent(
                  user.email,
                  'click',
                  'person_url_search',
                  null,
                  options
                );
                navigation.navigate('PeopleSearch');
                setData(info, type);
              }

              if (type === 'name') {
                info = data;
                // console.log('RELATIONSHIP TO:', data);
                let options = createOptions(null, 'relationship', index);
                sendEvent(
                  user.email,
                  'click',
                  'possible_person',
                  null,
                  options
                );
                navigation.navigate('PeopleSearch');
                setData(info, type);
              }
            }}
          >
            <Text style={{ color: 'white' }}>Perform a Search</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

const options = StyleSheet.create({
  border: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%'
  },

  container: {
    marginTop: 70,
    flex: 1,
    padding: 20
  },

  header: {
    fontSize: 23,
    justifyContent: 'center',
    color: '#508DB3',
    fontFamily: constants.fontFamily
  },

  question: {
    margin: 30,
    fontSize: 17,
    justifyContent: 'center',
    fontFamily: constants.fontFamily
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15
  },

  button: {
    paddingRight: 15,
    paddingLeft: 15
  },

  blueButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#508DB3'
  },

  greyButton: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10
  }
});
