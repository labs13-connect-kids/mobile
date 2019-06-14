import React from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Container, Button, Tabs, Tab, Input } from 'native-base';

import { ScrollView, FlatList } from 'react-native-gesture-handler';

import PersonsRow from '../components/PersonsRow';
import headerConfig from '../helpers/headerConfig';
class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);
  state = {
    name: '',
    cityState: '',
    email: '',
    address: '',
    phone: '',
    url: '',
    isDisplaying: false,
    possiblePersons: []
  };
  inputHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  handleEncodeURI = () => {
    // const testNamePerson = {
    //   names: [
    //     {
    //       first: `Roxann`,
    //       last: 'Collins'
    //     }
    //   ]
    // };
    const person = {};

    // Name constructor
    if (this.state.name.length) {
      person.names = [];
      let splitName = this.state.name.split(' ');
      if (splitName.length === 2) {
        person.names.push({ first: splitName[0], last: splitName[1] });
      } else if (splitName.length === 3) {
        person.names.push({
          first: splitName[0],
          middle: splitName[1],
          last: splitName[2]
        });
      }
    }
    // City State constructor
    // Right now acccounts for 2 length string City ST or State
    if (this.state.cityState.length) {
      person.addresses = [];
      let splitAddress = this.state.cityState.split(' ');
      if (splitAddress.length === 2) {
        person.addresses.push({
          state: splitAddress[1],
          city: splitAddress[0]
        });
      }
    }
    // Email constructor
    if (this.state.email.length) {
      person.emails = [];
      let splitEmail = this.state.email.split(' ');
      if (splitEmail.length === 1) {
        person.emails.push({
          address: splitEmail[0]
        });
      }
    }

    // Phone constructor
    // Test with 3303303333 format
    if (this.state.phone.length) {
      person.phones = [];
      let splitPhone = this.state.phone.split(' ');
      if (splitPhone.length === 1) {
        person.phones.push({
          number: splitPhone[0]
        });
      }
    }

    // Url constructor
    // Test with www.facebook.com/user
    // if (this.state.url.length) {
    //   person.urls = [];
    //   let splitUrl = this.state.url.split(' ');
    //   if (splitUrl.length === 1) {
    //     person.urls.push({
    //       url: splitUrl[0]
    //     });
    //   }
    // }

    const inputData = {
      person: {
        names: [
          {
            first: `Ken`,
            middle: 'Joseph',
            last: 'Kent',
            display: 'Clark Joseph Kent'
          }
        ],
        emails: [
          {
            address: 'clark.kent@example.com'
          }
        ],
        phones: [
          {
            '@type': 'home_phone',
            country_code: '1',
            number: '9785550145',
            display: '(978) 555-0145',
            display_international: '+1 978-555-0145'
          }
        ],
        addresses: [
          {
            country: 'US',
            state: 'KS',
            city: 'Smallville',
            street: 'Hickory Lane',
            house: '10',
            apartment: '1',
            zip_code: '66605',
            display: '10-1 Hickory Lane, Smallville, Kansas'
          },
          {
            '@type': 'work',
            country: 'US',
            state: 'KS',
            city: 'Metropolis',
            street: 'Broadway',
            house: '1000',
            apartment: '355',
            display: '1000-355 Broadway, Metropolis, Kansas'
          }
        ],
        urls: [
          {
            '@domain': 'linkedin.com',
            '@category': 'professional_and_business',
            url: 'https://www.linkedin.com/pub/superman/20/7a/365'
          },
          {
            '@domain': 'facebook.com',
            '@category': 'personal_profiles',
            url: 'https://www.facebook.com/superman'
          }
        ]
      }
    };
    console.log(
      JSON.stringify({
        person: encodeURI(JSON.stringify(person))
      })
    );
    return JSON.stringify({
      person: encodeURI(JSON.stringify(person))
    });
  };

  handlePersonSubmit = () => {
    const body = this.handleEncodeURI();
    axios
      .post('https://dev.search.connectourkids.org/api/search-v2', body)
      .then(res => {
        console.log(res.data.possible_persons);
        this.setState({ possiblePersons: res.data.possible_persons });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.intro}>Search By:</Text>
            </View>

            <View>
              <Tabs
                style={styles.container}
                activeTextStyle={{ color: '#64aab8' }}
                tabBarUnderlineStyle={{ backgroundColor: '#000' }}
              >
                <Tab
                  heading="Name"
                  style={[styles.nameInput, { color: '#64aab8' }]}
                  activeTextStyle={{ color: '#000' }}
                  textStyle={{ color: '#64aab8' }}
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
                  activeTextStyle={{ color: '#000' }}
                  textStyle={{ color: '#64aab8' }}
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
                  activeTextStyle={{ color: '#000' }}
                  textStyle={{ color: '#64aab8' }}
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
                  activeTextStyle={{ color: '#000' }}
                  textStyle={{ color: '#64aab8' }}
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
                  activeTextStyle={{ color: '#000' }}
                  textStyle={{ color: '#64aab8' }}
                >
                  <Input
                    placeholder="Social profile link or any URL"
                    style={styles.textInput}
                    value={this.state.url}
                    onChangeText={text => this.inputHandler('url', text)}
                  />
                </Tab>
              </Tabs>

              <Button
                info
                style={styles.button}
                onPress={this.handlePersonSubmit}
              >
                <Text style={styles.buttonText}> Search </Text>
              </Button>

              <Text style={styles.link}>
                This is a preview. Social workers can have completely free
                access. Click here to find out more.
              </Text>
              {this.state.isDisplaying && <Text>{this.state.name}</Text>}

              {this.state.possiblePersons.length ? (
                <>
                  <Text style={styles.matchesText}>Possible Matches</Text>
                  <FlatList
                    data={this.state.possiblePersons}
                    renderItem={({ item }) => {
                      return <PersonsRow item={item} />;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ) : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Container>
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
    fontSize: 15
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

export default PeopleSearchScreen;
