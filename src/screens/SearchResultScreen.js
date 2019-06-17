import React from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Container, Button, Tabs, Tab, Input } from 'native-base';

import { ScrollView } from 'react-native-gesture-handler';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import PersonInfo from '../components/Person/PersonInfo';
import SearchForm from '../components/SearchForm/SearchForm';

class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

  state = {
    isDisplaying: false,
    possiblePersons: [],
    person: null
  };
  componentDidMount() {
    const { searchPointerHash } = this.props.navigation.state.params;

    this.handlePersonRequest(searchPointerHash);
  }

  handleEncodeURI = () => {
    console.log(
      JSON.stringify({
        person: encodeURI(JSON.stringify(person))
      })
    );
    return JSON.stringify({
      person: encodeURI(JSON.stringify(person))
    });
  };

  handlePersonSubmit = () => {};

  handlePersonRequest = searchPointer => {
    // const body = this.handleEncodeURI();
    axios
      .post(constants.devURL, { search_pointer_hash: searchPointer })
      .then(res => {
        console.log(res.data.person);
        this.setState({ person: res.data.person });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { person } = this.state;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              {/* <Text style={styles.intro}>Search By:</Text> */}
              <Button
                style={styles.button}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.buttonText}>Back</Text>
              </Button>
            </View>
            {/* <SearchForm /> */}
            <View>
              <Text style={styles.link}>
                This is a preview. Social workers can have completely free
                access. Click here to find out more.
              </Text>
              {!person ? <ActivityIndicator /> : <PersonInfo item={person} />}
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

export default PeopleSearchScreen;
