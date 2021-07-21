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
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

    componentDidMount() {
      this.loadInitialState();
   }

   loadInitialState = async () => {
     try {
       let response = await AsyncStorage.getItem('currentUser');
       let user = await JSON.parse(response)

       if (user !== undefined) {
         this.setState({
           currentUser: user,
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
     } catch (e) {
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
       <Provider store={store}>
         <NavigationContainer>
           <Stack.Navigator initialRouteName="Main">
             <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
             <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
             <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
           </Stack.Navigator>
         </NavigationContainer>
       </Provider>
     );
  }
}

export default App;