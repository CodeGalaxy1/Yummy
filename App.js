import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);

import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listUsers: [],
      loaded: false,
      loggedIn: false,
    }
  }

    componentDidMount() {
      this.loadInitialState();
   }

   loadInitialState = async () => {
     try {
       const user = await AsyncStorage.getItem('token');
       console.log(user)
       if (user !== undefined) {
         this.setState({ 
           listUsers: user,
           loggedIn: false,
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
       //saving error
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
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      );
     }

     return (
       
      <MainScreen/>
      
     );
  }
}

export default App;