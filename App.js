import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import * as Font from 'expo-font';
import constants from './src/helpers/constants';
import Navigator from './src/navigation';

export default class App extends Component {
  state = { fontLoaded: false };
  static navigationOptions = {
    contentOptions: {
      activeTintColor: constants.highlightColor,
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      [constants.fontFamily]: require('./assets/fonts/Futura-Light.otf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={store}>
        <Navigator />
      </Provider>
    ) : null;
  }
}

// const BestPracticeNavigator = createStackNavigator(
//   {
//     BestPractices: {
//       screen: BestPracticesScreen
//     }
//   },
//   {
//     initialRouteName: 'BestPractices',
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: 80
//       }
//     }
//   }
// );
// const FamilyConnectionsNavigator = createStackNavigator(
//   {
//     FamilyConnections: {
//       screen: FamilyConnectionsScreen
//     }
//   },
//   {
//     initialRouteName: 'FamilyConnections',
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: 80
//       }
//     }
//   }
// );

// const PeopleSearchNavigator = createStackNavigator(
//   {
//     PeopleSearch: {
//       screen: PeopleSearchScreen
//     },
//     SearchResult: {
//       screen: SearchResultScreen
//     }
//   },
//   {
//     initialRouteName: 'PeopleSearch',
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: 80
//       }
//     }
//   }
// );

// const AuthenticationViewNavigator = createStackNavigator(
//   {
//     Authentication: {
//       screen: AuthenticationView
//     }
//   },
//   {
//     // initialRouteName: 'Login/Register',
//     // defaultNavigationOptions: {
//     //   headerStyle: {
//     //     height: 80
//     //   }
//     // }
//   }
// );

// const AppDrawerNavigator = createDrawerNavigator(
//   {
//     'Best Practices': {
//       screen: BestPracticeNavigator
//     },
//     'Family Connections': {
//       screen: FamilyConnectionsNavigator
//     },
//     'People Search': {
//       screen: PeopleSearchNavigator
//     },
//     'Login/Register': {
//       screen: AuthenticationViewNavigator
//     }
//   },
//   {
//     drawerPosition: 'right',
//     contentOptions: { activeTintColor: constants.highlightColor }
//   }
// );

// const AppSwitchNavigator = createSwitchNavigator({
//   BestPractices: { screen: AppDrawerNavigator },
//   FamilyConnections: { screen: AppDrawerNavigator },
//   PeopleSearch: { screen: AppDrawerNavigator },
//   Authentication: { screen: AuthenticationViewNavigator }
// });

// const AppContainer = createAppContainer(AppSwitchNavigator);
