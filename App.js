import React, { Component } from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { StyleSheet } from "react-native";
import { Button } from "native-base";

import BestPracticesScreen from "./src/screens/BestPracticesScreen";
import FamilyConnectionsScreen from "./src/screens/FamilyConnectionsScreen";
import PeopleSearchScreen from "./src/screens/PeopleSearchScreen";

export default class App extends Component {
  static navigationOptions = {
    contentOptions: {
      activeTintColor: "#e91e63",
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  };
  render() {
    return <AppContainer />;
  }
}

const BestPracticeNavigator = createStackNavigator(
  {
    BestPractices: {
      screen: BestPracticesScreen
    }
  },
  {
    initialRouteName: "BestPractices"
  }
);
const FamilyConnectionsNavigator = createStackNavigator(
  {
    FamilyConnections: {
      screen: FamilyConnectionsScreen
    }
  },
  {
    initialRouteName: "FamilyConnections"
  }
);

const PeopleSearchNavigator = createStackNavigator(
  {
    PeopleSearch: {
      screen: PeopleSearchScreen
    }
  },
  {
    initialRouteName: "PeopleSearch"
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    "Best Practices": {
      screen: BestPracticeNavigator
    },
    "Family Connections": {
      screen: FamilyConnectionsNavigator
    },
    "People Search": {
      screen: PeopleSearchNavigator
    }
  },
  {
    drawerPosition: "right",
    contentOptions: {
      activeTintColor: "rgb(80,141,179)",
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: AppDrawerNavigator },
  FamilyConnections: { screen: AppDrawerNavigator },
  PeopleSearch: { screen: AppDrawerNavigator }
});

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: "row"
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
