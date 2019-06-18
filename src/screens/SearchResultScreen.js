import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Container, Button } from 'native-base';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchPerson } from '../store/actions';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import PersonInfo from '../components/Person/PersonInfo';

class PeopleSearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('People Search', navigation);

  componentDidMount() {
    const { fetchPerson, person } = this.props;
    if (!person) {
      const { searchPointer } = this.props.navigation.state.params;
      fetchPerson(searchPointer);
    }
  }

  render() {
    const { person } = this.props;
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
  { fetchPerson }
)(PeopleSearchScreen);
