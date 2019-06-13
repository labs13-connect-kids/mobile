import React from 'react';
import BestPracticesScreen from './src/screens/BestPracticesScreen';
import FamilyConnectionsScreen from './src/screens/FamilyConnectionsScreen';
import PeopleSearchScreen from './src/screens/PeopleSearchScreen';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

export default function App() {
  return <AppContainer />;
}

// const AppNavigator = createStackNavigator(
//   {
//     BestPractices: {
//       screen: BestPracticesScreen
//     },
//     FamilyConnections: {
//       screen: FamilyConnectionsScreen
//     }
//   },
//   {
//     initialRouteName: "BestPractices",
//   }
// );
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

// const AppContainer = createAppContainer(AppNavigator);

const AppDrawerNavigator = createDrawerNavigator(
  {
    BestPractices: {
      screen: BestPracticeNavigator
    },
    FamilyConnections: {
      screen: FamilyConnectionsNavigator
    },
    PeopleSearch: {
      screen: PeopleSearchNavigator
    }
  }
  // To make drawer open on right side uncomment line below
  // { drawerPosition: "right" }
);

const AppSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: AppDrawerNavigator },
  FamilyConnections: { screen: AppDrawerNavigator },
  PeopleSearch: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
