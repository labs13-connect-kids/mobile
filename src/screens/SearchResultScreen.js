import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';

import { Container, Button } from 'native-base';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import {
  eventTrack,
  fetchPerson,
  resetPerson,
  setModalVisible,
  setAgreeModalVisible,
  setUserCreds,
  setVideoPlayerModalVisible,
  showModal
} from '../store/actions';
// import { createEvent } from '../helpers/createEvent';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import PersonInfo from '../components/Person/PersonInfo';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import authHelpers from '../helpers/authHelpers';
import RegisterModalsContainer from './../components/AuthModals/RegisterModalsContainer';
import { ConfirmationModal } from '../components/Person/ConfirmationModal';

class SearchResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

  state = {
    requestObject: {},
    modalVisible: false,
    key: '',
    type: '',
    address: ''
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  componentDidMount() {
    const {
      accessToken,
      eventTrack,
      fetchPerson,
      idToken,
      isLoggedIn,
      person,
      resetPerson
    } = this.props;

    if (this.props.navigation.state.params) {
      const requestObject = {};

      if (person) {
        resetPerson();
      }

      const { searchPointer } = this.props.navigation.state.params;
      requestObject['search_pointer_hash'] = searchPointer;

      if (isLoggedIn) {
        requestObject['authToken'] = accessToken;
        requestObject['idToken'] = idToken;
      } else {
        this.setState({ requestObject });
      }

      fetchPerson(JSON.stringify(requestObject), eventTrack, this.createEvent);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('CDU SRS');
    if (
      prevProps.isLoggedIn === false &&
      this.props.isLoggedIn === true &&
      this.state.requestObject
    ) {
      console.log('requestobj: ', this.state.requestObject);
      this.props.resetPerson();
      let requestObject = { ...this.state.requestObject };
      requestObject['authToken'] = this.props.accessToken;
      requestObject['idToken'] = this.props.idToken;
      this.props.fetchPerson(
        JSON.stringify(requestObject),
        this.props.eventTrack,
        this.createEvent
      );
      this.setState({ requestObject: {} });
    }
  }

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

  startRegister = () => {
    this.props.setModalVisible(true);
  };

  showConModal = ( key, type )=> {
      this.setState({ key: key, type: type })
      this.toggleModal()
  }

  render() {
    const { isLoggedIn, person } = this.props;
    console.log('PERSON', person, 'SRS STATE: ', this.state);
    return (
      <Container style={styles.container}>
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
        <SafeAreaView>
          <ScrollView>
            <View>
              <Button
                style={styles.button}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.buttonText}>Back</Text>
              </Button>
            </View>
            <View>
              {!isLoggedIn && (
                <TouchableHighlight onPress={this.startRegister}>
                  <Text style={styles.link}>
                    This is a preview. Social workers can have completely free
                    access. Click here to find out more.
                  </Text>
                </TouchableHighlight>
              )}
              {this.props.error && <ErrorMessage />}
              {!person ? (
                <Loader />
              ) : (
                  <PersonInfo
                    item={person}
                    setModalVisible={this.props.setModalVisible}
                    startRegister={this.startRegister}
                    isLoggedIn={isLoggedIn}
                    showConModal={this.showConModal}
                  />
                )}
            </View>
          </ScrollView>
        </SafeAreaView>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.toggleModal}
          >
            <ConfirmationModal
              toggleModal={this.toggleModal}
              type = {this.state.type}
              data={this.state.key}
              home={this.state.address}
            />
          </Modal>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    user,
    modalVisible,
    videoAgree,
    videoVisible
  };
};

export default connect(
  mapStateToProps,
  {
    eventTrack,
    fetchPerson,
    resetPerson,
    setModalVisible,
    setAgreeModalVisible,
    setUserCreds,
    setVideoPlayerModalVisible,
    showModal
  }
)(SearchResultScreen);
