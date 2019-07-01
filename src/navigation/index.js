import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import BestPracticesScreen from '../screens/BestPracticesScreen';
import FamilyConnectionsScreen from '../screens/FamilyConnectionsScreen';
import PeopleSearchScreen from '../screens/PeopleSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import constants from '../helpers/constants';
import AuthenticationView from '../screens/AuthenticationScreen';

const BestPracticeNavigator = createStackNavigator(
  {
    BestPractices: {
      screen: BestPracticesScreen
    }
  },
  {
    initialRouteName: 'BestPractices',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
  }
);
const FamilyConnectionsNavigator = createStackNavigator(
  {
    FamilyConnections: {
      screen: FamilyConnectionsScreen
    }
  },
  {
    initialRouteName: 'FamilyConnections',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
  }
);

const PeopleSearchNavigator = createStackNavigator(
  {
    PeopleSearch: {
      screen: PeopleSearchScreen
    },
    SearchResult: {
      screen: SearchResultScreen
    }
  },
  {
    initialRouteName: 'PeopleSearch',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
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
    },
    'Log In / Sign Up \n\nLog Out': {
      screen: AuthenticationView
    }
  },
  {
    drawerPosition: 'right',
    contentOptions: { activeTintColor: constants.highlightColor }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: AppDrawerNavigator },
  FamilyConnections: { screen: AppDrawerNavigator },
  PeopleSearch: { screen: AppDrawerNavigator },
  Authentication: { screen: AuthenticationView }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
