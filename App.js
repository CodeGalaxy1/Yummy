import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);

const LiveDNSUrl = 'http://ruppinmobile.tempdomain.co.il/site08/api/user'

import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';


const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  //  componentDidMount() {
  //    if (!this.state.loggedIn) {
  //     this.setState({
  //        loggedIn: false,
  //        loaded: true,
  //      })
  //    } else {
  //      this.setState({
  //        loggedIn: true,
  //        loaded: true,
  //      })
  //    }
  // }

  render () {
    // const { loggedIn, loaded } = this.state;
    // if (!loaded) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <Text>Loading</Text>
    //     </View>
    //   );
    // }

    // if (!loggedIn) {
      return (
        <>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      );
    // }

    // return (
    //   <View style={{ flex: 1, justifyContent: 'center' }}>
    //     <Text>User is logged in</Text>
    //   </View>
    // );
  }
}
