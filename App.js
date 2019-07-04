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
      [constants.fontFamily]: require('./assets/fonts/Futura-Light.otf'),
      ['Roboto_medium']: require('./assets/fonts/Roboto_medium.otf')
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
