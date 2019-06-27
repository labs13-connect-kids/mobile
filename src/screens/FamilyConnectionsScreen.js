import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  WebView,
  Platform,
  Modal,
  Alert
} from 'react-native';
import { Container, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import headerConfig from '../helpers/headerConfig';
import { trackEmail } from './../store/actions';
import FamilyConnectionsModal from './../components/FamilyConnectionsModal/FamilyConnectionsModal';
import constants from '../helpers/constants';
class FamilyConnectionsScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Family Connections', navigation);

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  trackInterest = trackingEmail => {
    let email = this.props.email ? this.props.email : trackingEmail;
    this.props
      .trackEmail({ emailAddress: email })
      .then(res => {
        this.props.error
          ? Alert.alert(this.props.error.message)
          : this.props.message !== undefined
          ? Alert.alert(this.props.message)
          : Alert.alert(
              'there was a problem talking to the database, Please try again later'
            );
        this.toggleModal();
      })
      .catch(res => {
        Alert.alert(this.props.message);
        this.toggleModal();
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={this.toggleModal}
            >
              <FamilyConnectionsModal
                trackInterest={this.trackInterest}
                toggleModal={this.toggleModal}
                startRegister={this.startRegister}
                email={this.props.email}
              />
            </Modal>
          </View>
          <ScrollView>
            <Text style={styles.mainText}>
              Learn about a revolutionary way to discover and engage extended
              families for at-risk foster youth.
            </Text>
            <View style={{ height: 300, marginBottom: 30 }}>
              <WebView
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
              />
            </View>

            <Button style={styles.button} block onPress={this.toggleModal}>
              <Text style={styles.buttonText}>
                I Want To Access Family Connections
              </Text>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },
  mainText: {
    fontFamily: constants.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  red: {
    backgroundColor: 'red'
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  console.log('redux state FCS: ', state);
  const { message, error } = state.famConInterest;
  return {
    email: state.auth.user ? state.auth.user.email : null,
    message,
    error
  };
};

export default connect(
  mapStateToProps,
  {
    trackEmail
  }
)(FamilyConnectionsScreen);
