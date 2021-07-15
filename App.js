import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);

import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thuck from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thuck))

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      loaded: false,
      loggedIn: true,
    }
  }

   componentDidMount() {
     this.loadInitialState();
  }

  loadInitialState = async () => {
    try {
      const user = await AsyncStorage.getItem('Token');
      if (user !== null) {
        this.setState({ 
          listUsers: user,
          loggedIn: true,
          loaded: true,
         })
      }
      else {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
    } catch(e) {

    }
  }

  render () {
    if (!this.state.loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!this.state.loggedIn) {
      return (
        <>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      );
    }

    return (
      <Provider store={store}>
        <MainScreen/>
      </Provider>
    );
  }
}

export default App;