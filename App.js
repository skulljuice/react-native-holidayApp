import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View
  , AsyncStorage
} from "react-native"

import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn: false
  };
  async componentDidMount() {
    try {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn != null) {
        this.setState({ loggedIn: loggedIn })
      }
    } catch (error) {
      // Error retrieving data
      console.log('Error', error);

    }
  }
  setLogin = async (x) => {
    console.log(x);
    try {
      await AsyncStorage.setItem({ 'user': JSON.stringify(x) });
      this.setState({ loggedIn: x.loggedIn });
    } catch (err) {
      console.log(err);
    }

  }
  render() {
    const { loggedIn } = this.state;
    // console.log('logged', loggedIn);
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (loggedIn) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <LoginScreen refresh={this.setLogin} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
