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
    const inputName = name;
    const inputValue = this.state[name];
    let nameInput;
    let cityStateInput;

    if (inputValue.length === 0) {
      if (inputName === 'name') {
        cityStateInput = this.state.cityState;
      } else if (inputName === 'cityState') {
        nameInput = this.state.name;
      } else {
        cityStateInput = '';
        nameInput = '';
      }
      this.setState({
        name: nameInput,
        cityState: cityStateInput,
        email: '',
        address: '',
        phone: '',
        url: ''
      });
    }
    this.setState({ [name]: value });
  };

  handleFormSubmit = () => {
    let inputKey;
    let inputValue;
    let formattedObject = null;

    const inputObj = this.findInputWithLength();
    for (let [key, value] of Object.entries(inputObj)) {
      inputKey = key;
      inputValue = value;
    }

    if (this.isName(inputValue)) {
      if (!this.state.name) {
        this.setState({ name: inputValue, [inputKey]: '' });
      }
      formattedObject = this.formatRequestObject(inputValue, 'name');
    } else if (this.isEmail(inputValue)) {
      if (!this.state.email) {
        this.setState({ email: inputValue, [inputKey]: '' });
      }
      formattedObject = this.formatRequestObject(inputValue, 'email');
    } else if (this.isPhone(inputValue)) {
      if (!this.state.phone) {
        this.setState({ phone: inputValue, [inputKey]: '' });
      }
      formattedObject = this.formatRequestObject(inputValue, 'phone');
    } else if (this.isUrl(inputValue)) {
      if (!this.state.url) {
        this.setState({ url: inputValue, [inputKey]: '' });
      }
      formattedObject = this.formatRequestObject(inputValue, 'url');
    } else {
      console.log('your input is not valid');
    }
    if (formattedObject) {
      this.props.handleSearch(formattedObject);
    } else {
      console.log('formattedObject: error');
    }
  };

  isName = name => {
    if (name.length) {
      let numberOfWords = name.trim().split(' ').length;
      let isNumberOfWordsTwoOrThree =
        numberOfWords === 2 || numberOfWords === 3;
      let nameIsNotANumber = name.replace(/[^0-9]+/g, '').length === 0;

      return isNumberOfWordsTwoOrThree && nameIsNotANumber;
    }
    return false;
  };
  isEmail = email => {
    if (email.length) {
      let isValidEmail = email.trim().split('@').length;
      return isValidEmail === 2;
    }
    return false;
  };

  isPhone = phone => {
    if (phone.length) {
      let numbersOnly = phone.replace(/[^0-9]+/g, '');

      return numbersOnly.length === 10;
    }
    return false;
  };

  isUrl = url => {
    if (url.length) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      return !!pattern.test(url);
    }
    return false;
  };

  findInputWithLength = () => {
    let input;
    let name;

    for (let key in this.state) {
      if (key !== 'cityState') {
        if (this.state[key].length) {
          input = this.state[key];
          name = key;
        }
      }
    }
    if (name && input) {
      return { [name]: input };
    } else {
      console.log('Something went wrong!');
    }
  };

  formatRequestObject = (inputValue, type) => {
    const person = {};

    switch (type) {
      case 'name':
        person.names = [];
        let splitName = inputValue.trim().split(' ');
        if (splitName.length === 2) {
          person.names.push({ first: splitName[0], last: splitName[1] });
        } else if (splitName.length === 3) {
          person.names.push({
            first: splitName[0],
            middle: splitName[1],
            last: splitName[2]
          });
        }

        if (this.state.cityState.length) {
          person.addresses = [];
          let splitAddress = this.state.cityState.trim().split(' ');
          if (splitAddress.length > 1) {
            let state = splitAddress.pop();
            let city = splitAddress.join(' ').replace(/,/g, '');
            person.addresses.push({
              state: state,
              city: city
            });
          }
        }
        break;

      case 'email':
        person.emails = [];
        person.emails.push({
          address: inputValue
        });
        break;

      case 'phone':
        person.phones = [];
        person.phones.push({
          number: inputValue.replace(/[^0-9]+/g, '')
        });
        break;

      case 'url':
        person.urls = [];
        person.urls.push({
          url: inputValue
        });
        break;

      default:
        console.log('Something happened ERROR');
        break;
    }
    return person;
  };

  startOver = () => {
    this.props.resetReduxState();
    this.setState({
      name: '',
      cityState: '',
      email: '',
      address: '',
      phone: '',
      url: ''
    });
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
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
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
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
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
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
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
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
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
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
          >
            <Input
              placeholder="Social profile link or any URL"
              style={styles.textInput}
              value={this.state.url}
              onChangeText={text => this.inputHandler('url', text)}
            />
          </Tab>
        </Tabs>
        <View style={{ flexDirection: 'row' }}>
          <Button info style={styles.button} onPress={this.handleFormSubmit}>
            <Text style={styles.buttonText}> Search </Text>
          </Button>

          <Button info style={styles.greyButton} onPress={this.startOver}>
            <Text style={styles.buttonText}> Start Over </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5
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
  },
  greyButton: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10
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

export default SearchForm;
