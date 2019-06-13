import React from 'react';
import axios from 'axios';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  H2,
  Tabs,
  Tab,
  Input
} from 'native-base';
import logoImg from '../../assets/simple-logo.png';
import { ScrollView } from 'react-native-gesture-handler';

class PeopleSearchScreen extends React.Component {
  state = {
    name: '',
    cityState: '',
    address: '',
    phone: '',
    url: '',
    isDisplaying: false
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
    // Reference for proper API post
    const inputData = {
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
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.header}>
              <Image
                source={logoImg}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
              <View>
                <H2>Connect Our Kids</H2>
                <H2>People Search</H2>
              </View>
              <Icon
                ios="ios-menu"
                android="md-menu"
                style={{ fontSize: 40, color: '#000' }}
              />
            </View>

            <View>
              <Text style={styles.intro}>Search By:</Text>
            </View>

            <View>
              <Tabs style={styles.container}>
                <Tab heading="Name" style={styles.nameInput}>
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
                <Tab heading="Email">
                  <Input
                    placeholder="Email address"
                    style={styles.textInput}
                    value={this.state.email}
                    onChangeText={text => this.inputHandler('email', text)}
                  />
                </Tab>
                <Tab heading="Address">
                  <Input
                    placeholder="Mailing address"
                    style={styles.textInput}
                    value={this.state.address}
                    onChangeText={text => this.inputHandler('address', text)}
                  />
                </Tab>
                <Tab heading="Phone">
                  <Input
                    placeholder="Phone any format, no letters"
                    style={styles.textInput}
                    value={this.state.phone}
                    onChangeText={text => this.inputHandler('phone', text)}
                  />
                </Tab>
                <Tab heading="URL">
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    padding: 10
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
    borderRadius: 10
  }
});

export default PeopleSearchScreen;
