import React, { Component } from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import * as Font from 'expo-font';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import BestPracticesScreen from './src/screens/BestPracticesScreen';
import FamilyConnectionsScreen from './src/screens/FamilyConnectionsScreen';
import PeopleSearchScreen from './src/screens/PeopleSearchScreen';

export default class App extends Component {
  state = { fontLoaded: false };
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: () => (
      <View style={styles.authContainer}>
        <Button>
          <Text>Log In</Text>
        </Button>
        <Button>
          <Text>Sign Up</Text>
        </Button>
      </View>
    )
  };
  async componentDidMount() {
    await Font.loadAsync({
      'futura-light': require('./assets/fonts/Futura-Light.otf')
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? <AppContainer /> : null;
  }
}

const BestPracticeNavigator = createStackNavigator(
  {
    BestPractices: {
      screen: BestPracticesScreen
    }
  },
  {
    initialRouteName: 'BestPractices'
  }
);
const FamilyConnectionsNavigator = createStackNavigator(
  {
    FamilyConnections: {
      screen: FamilyConnectionsScreen
    }
  },
  {
    initialRouteName: 'FamilyConnections'
  }
);

const PeopleSearchNavigator = createStackNavigator(
  {
    PeopleSearch: {
      screen: PeopleSearchScreen
    }
  },
  {
    initialRouteName: 'PeopleSearch'
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    'Best Practices': {
      screen: BestPracticeNavigator
    },
    'Family Connections': {
      screen: FamilyConnectionsNavigator
    },
    'People Search': {
      screen: PeopleSearchNavigator
    }
  },
  { drawerPosition: 'right' }
);

const AppSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: AppDrawerNavigator },
  FamilyConnections: { screen: AppDrawerNavigator },
  PeopleSearch: { screen: AppDrawerNavigator }
});

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: 'row'
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
