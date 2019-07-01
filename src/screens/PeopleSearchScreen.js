import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchPerson,
  fetchSearchResult,
  resetState,
  eventTrack,
  setModalVisible,
  setAgreeModalVisible,
  setUserCreds,
  setVideoPlayerModalVisible,
  getInfo
} from '../store/actions';

import { Container, Button } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
// import { createEvent } from '../helpers/createEvent';

import PersonRow from '../components/Person/PersonRow';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import SearchForm from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import RecentSearches from '../components/RecentSearches/RecentSearches';

import saveToRecentSearches from '../helpers/saveToRecentSearches';
import authHelpers from '../helpers/authHelpers';
import RegisterModalsContainer from './../components/AuthModals/RegisterModalsContainer';

class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

  state = {
    data: this.props.info,
    type: this.props.type
  };

  createEvent = success => {
    let emailAddress = '';
    let options = {};
    if (typeof success === 'string') {
      options = {
        possibleMatches: this.props.possiblePersons.length,
        personMatch: false
      };
    } else {
      options = {
        possibleMatches: 0,
        personMatch: true
      };
    }
    if (!this.props.user) {
      emailAddress = 'anonymous@unknown.org';
    } else {
      emailAddress = this.props.user.email;
    }
    const event = {
      emailAddress,
      event:
        typeof success === 'string'
          ? `person-search-${success}`
          : `person-search-${success[0]}`,
      options
    };
    return event;
  };

  handleEncodeURI = person => {
    return encodeURI(JSON.stringify(person));
  };

  handleSearchRequest = (person, searchType, searchInput) => {
    const {
      accessToken,
      fetchSearchResult,
      idToken,
      isLoggedIn,
      navigation
    } = this.props;

    const body = {};
    const requestObject = {};

    if (isLoggedIn) {
      requestObject['authToken'] = accessToken;
      requestObject['idToken'] = idToken;
      // Add to save to recent searcg
      body['searchType'] = searchType;
      body['searchInput'] = searchInput;
      // saveToRecentSearches({
      //   searchType: searchType,
      //   searchInput: searchInput,
      //   formattedObject: person
      // });
    }

    requestObject['person'] = this.handleEncodeURI(person);
    body['requestObject'] = JSON.stringify(requestObject);
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
      await this.handlePersonRequest(
        searchPointer,
        this.props.eventTrack,
        this.createEvent
      );
    }
    await this.props.navigation.navigate('SearchResult', {
      person: person
    });
  };

  resetReduxState = () => {
    const { resetState } = this.props;
    resetState();
  };

  startRegister = () => {
    this.props.setModalVisible(true);
  };

  render() {
    const { isLoggedIn, navigation } = this.props;
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <RegisterModalsContainer
            modalVisible={this.props.modalVisible}
            setAgreeModalVisible={this.props.setAgreeModalVisible}
            videoAgree={this.props.videoAgree}
            videoVisible={this.props.videoVisible}
            setModalVisible={this.props.setModalVisible}
            setVideoPlayerModalVisible={this.props.setVideoPlayerModalVisible}
            onLogin={() =>
              authHelpers.handleLogin(
                authHelpers._loginWithAuth0,
                this.props.setUserCreds
              )
            }
          />
          <ScrollView>
            <View>
              <Text style={styles.intro}>Search By:</Text>
            </View>

            <View>
              <SearchForm
                handleSearch={this.handleSearchRequest}
                resetReduxState={this.resetReduxState}
                data={this.props.data}
              />

              {!isLoggedIn && (
                <TouchableHighlight onPress={this.startRegister}>
                  <Text style={styles.link}>
                    This is a preview. Social workers can have completely free
                    access. Click here to find out more.
                  </Text>
                </TouchableHighlight>
              )}
              {this.props.isFetching && <Loader />}
              {this.props.error && <ErrorMessage />}
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
              {isLoggedIn && (
                <RecentSearches
                  handleSearch={this.handleSearchRequest}
                  navigation={navigation}
                />
              )}
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
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    color: `${constants.highlightColor}`,
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
  }
});

const mapStateToProps = state => {
  const { error, isFetching, person, possiblePersons } = state.people;
  const {
    accessToken,
    idToken,
    isLoggedIn,
    user,
    modalVisible,
    videoAgree,
    videoVisible
  } = state.auth;
  return {
    accessToken,
    error,
    idToken,
    isFetching,
    isLoggedIn,
    person,
    possiblePersons,
    modalVisible,
    videoAgree,
    videoVisible,
    user,
    info: state.confirmationModal.info,
    queryType: state.confirmationModal.queryType
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPerson,
    fetchSearchResult,
    resetState,
    eventTrack,
    setModalVisible,
    setAgreeModalVisible,
    setUserCreds,
    setVideoPlayerModalVisible,
    getInfo
  }
)(PeopleSearchScreen);
