import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchPerson,
  fetchSearchResult,
  resetState,
  eventTrack
} from '../store/actions';

import { Container } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
// import { eventTrack } from '../helpers/eventTracking';

import PersonRow from '../components/Person/PersonRow';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import SearchForm from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';

class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

  createEvent = success => {
    let emailAddress;
    const options = {
      possibleMatches: this.props.possiblePersons.length,
      personMatch: this.props.possiblePersons.length === 0 ? true : false
    };
    if (!this.props.user) {
      emailAddress = 'anonymous@unknown.org';
    } else {
      emailAddress = this.props.user.email;
    }
    const event = {
      emailAddress,
      event: `person-search-${success}`,
      options
    };
    console.log('event:', event);
    return this.props.eventTrack(event);
  };

  handleEncodeURI = person => {
    console.log(
      JSON.stringify({
        person: encodeURI(JSON.stringify(person))
      })
    );
    return JSON.stringify({
      person: encodeURI(JSON.stringify(person))
    });
  };

  handleSearchRequest = person => {
    const { fetchSearchResult, navigation } = this.props;
    const body = this.handleEncodeURI(person);
    fetchSearchResult(
      body,
      () => navigation.navigate('SearchResult'),
      this.props.eventTrack,
      this.createEvent
    );
  };

  handleNavigateToResult = async searchPointer => {
    const { person } = this.state;
    if (!person) {
      await this.handlePersonRequest(searchPointer);
    }
    await this.props.navigation.navigate('SearchResult', {
      person: person
    });
  };

  resetReduxState = () => {
    const { resetState } = this.props;
    resetState();
  };

  render() {
    console.log('PROPS PEOPLE SEARCH SCREEN: ', this.props);
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.intro}>Search By:</Text>
            </View>

            <View>
              <SearchForm
                handleSearch={this.handleSearchRequest}
                resetReduxState={this.resetReduxState}
              />

              <Text style={styles.link}>
                This is a preview. Social workers can have completely free
                access. Click here to find out more.
              </Text>
              {this.props.isFetching && <Loader />}
              {!!this.props.possiblePersons.length ? (
                <>
                  <Text style={styles.matchesText}>Possible Matches</Text>
                  <FlatList
                    data={this.props.possiblePersons}
                    renderItem={({ item }) => {
                      return (
                        <PersonRow
                          item={item}
                          handlePress={() =>
                            this.props.navigation.navigate('SearchResult', {
                              searchPointer: item['@search_pointer_hash']
                            })
                          }
                        />
                      );
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

    fontFamily: constants.fontFamily,
    fontSize: 18
  },

  textInput: {
    borderColor: constants.highlightColor,
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
    color: '#fff',
    lineHeight: 17,
    padding: 15,
    backgroundColor: constants.highlightColor,
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
  }
});

const mapStateToProps = state => {
  const { error, isFetching, person, possiblePersons } = state.people;
  const { user } = state.auth;
  return {
    error,
    isFetching,
    person,
    possiblePersons,
    user
  };
};

export default connect(
  mapStateToProps,
  { fetchPerson, fetchSearchResult, resetState, eventTrack }
)(PeopleSearchScreen);
