import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  StatusBar
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
  showModal,
  getInfo
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
    address: '',
    info: '',
    index: null
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  componentDidMount() {
    const {
      accessToken,
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

      fetchPerson(
        JSON.stringify(requestObject),
        this.props.user ? this.props.user.email : null
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('CDU SRS');
    if (
      prevProps.isLoggedIn === false &&
      this.props.isLoggedIn === true &&
      this.state.requestObject
    ) {
      // console.log('requestobj: ', this.state.requestObject);
      this.props.resetPerson();
      let requestObject = { ...this.state.requestObject };
      requestObject['authToken'] = this.props.accessToken;
      requestObject['idToken'] = this.props.idToken;
      this.props.fetchPerson(
        JSON.stringify(requestObject),
        this.props.user ? this.props.user.email : null
      );
      this.setState({ requestObject: {} });
    }
  }

  startRegister = () => {
    this.props.setModalVisible(true);
  };

  showConModal = (key, type, index) => {
    this.setState({ key, type, index });
    this.toggleModal();
  };

  setData = (key, type) => {
    this.setState({ info: key, type: type });
    this.props.getInfo(key, type);
  };

  render() {
    const { isLoggedIn, person, user } = this.props;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.toggleModal}
          >
            <ConfirmationModal
              toggleModal={this.toggleModal}
              type={this.state.type}
              data={this.state.key}
              home={this.state.address}
              navigation={this.props.navigation}
              setData={this.setData}
              user={user}
              index={this.state.index}
            />
          </Modal>
        </View>
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
                  navigation={this.props.navigation}
                  setData={this.setData}
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
  // console.log(state);
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
    videoVisible,
    getInfo: state.confirmationModal.info
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
    showModal,
    getInfo
  }
)(SearchResultScreen);
