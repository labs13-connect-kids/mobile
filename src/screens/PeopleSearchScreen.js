import React from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { fetchPerson, fetchSearchResult, resetState } from '../store/actions';

import { Container, Button, Tabs, Tab, Input } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import PersonRow from '../components/Person/PersonRow';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import SearchForm from '../components/SearchForm/SearchForm';

class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

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
    fetchSearchResult(body, () => navigation.navigate('SearchResult'));
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
    // console.log(this.props.navigation);
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
  return {
    error,
    isFetching,
    person,
    possiblePersons
  };
};

export default connect(
  mapStateToProps,
  { fetchPerson, fetchSearchResult, resetState }
)(PeopleSearchScreen);




