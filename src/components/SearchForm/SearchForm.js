import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Tabs, Tab, Input } from 'native-base';
import constants from '../../helpers/constants';

class SearchForm extends Component {
  state = {
    name: '',
    cityState: '',
    email: '',
    address: '',
    phone: '',
    url: ''
  };

  inputHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <View>
        <Tabs
          style={styles.container}
          activeTextStyle={{ color: '#64aab8' }}
          tabBarUnderlineStyle={{ backgroundColor: '#000' }}
        >
          <Tab
            heading="Name"
            style={[styles.nameInput, { color: '#64aab8' }]}
            activeTextStyle={{
              color: '#000',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
            textStyle={{
              color: '#64aab8',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
          >
            <Input
              placeholder="First and last, middle optional"
              style={styles.textInput}
              value={this.state.name}
              onChangeText={text => this.inputHandler('name', text)}
            />
            <Input
              placeholder="City, State"
              style={[styles.textInput, styles.textInputSmall]}
              value={this.state.cityState}
              onChangeText={text => this.inputHandler('cityState', text)}
            />
          </Tab>

          <Tab
            heading="Email"
            activeTextStyle={{
              color: '#000',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
            textStyle={{
              color: '#64aab8',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
          >
            <Input
              placeholder="Email address"
              style={styles.textInput}
              value={this.state.email}
              onChangeText={text => this.inputHandler('email', text)}
            />
          </Tab>
          <Tab
            heading="Address"
            activeTextStyle={{
              color: '#000',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
            textStyle={{
              color: '#64aab8',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
          >
            <Input
              placeholder="Mailing address"
              style={styles.textInput}
              value={this.state.address}
              onChangeText={text => this.inputHandler('address', text)}
            />
          </Tab>
          <Tab
            heading="Phone"
            activeTextStyle={{
              color: '#000',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
            textStyle={{
              color: '#64aab8',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
          >
            <Input
              placeholder="Phone any format, no letters"
              style={styles.textInput}
              value={this.state.phone}
              onChangeText={text => this.inputHandler('phone', text)}
            />
          </Tab>
          <Tab
            heading="URL"
            activeTextStyle={{
              color: '#000',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
            textStyle={{
              color: '#64aab8',
              fontFamily: constants.fontFamily,
              fontSize: 16
            }}
          >
            <Input
              placeholder="Social profile link or any URL"
              style={styles.textInput}
              value={this.state.url}
              onChangeText={text => this.inputHandler('url', text)}
            />
          </Tab>
        </Tabs>

        <Button info style={styles.button} onPress={this.handlePersonSubmit}>
          <Text style={styles.buttonText}> Search </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5
  },

  header: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  intro: {
    padding: 10,

    fontFamily: constants.fontFamily,
    fontSize: 18
  },

  textInput: {
    borderColor: '#64aab8',
    borderWidth: 1,
    borderStyle: 'solid',
    flex: 2
  },

  textInputSmall: {
    flex: 1
  },
  nameInput: {
    flexDirection: 'row'
  },

  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#508DB3'
  },

  tab: {
    backgroundColor: 'white'
  },

  buttonText: {
    color: 'white'
  },

  link: {
    color: '#64aab8',
    lineHeight: 17,
    padding: 15,
    backgroundColor: 'rgb(216,236,240)',
    borderRadius: 10,
    marginBottom: 20
  },
  matchesText: {
    fontSize: 20,
    color: '#508DB3',
    marginBottom: 20
  }
});

export default SearchForm;
