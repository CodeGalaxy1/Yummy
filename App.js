import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);

import React, {Component} from 'react';

//Tags
import { View, Text } from 'react-native';

//Navigation(Stack) plugin
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//AsyncStorage plugin
import AsyncStorage from '@react-native-async-storage/async-storage';

//Redux library
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';

//Redux-thunk library
import thunk from 'redux-thunk';

//Screens
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import RecipeScreen from './components/main/Recipe';
import UpdateScreen from './components/main/Update';


//Creating the store by function createStore(reducer, Strengthen the "store")
/*
----- applyMiddleware(thunk) -----
Allows us instead of "action" that returns an object,
 to create "action" that returns a function that is going to be called with the "store.dispatch" method.
You can also read asynchronously.
*/
const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

//Class Component(App)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

   loadInitialState = async () => {
     //Returns the current user in storage
     let response = await AsyncStorage.getItem('currentUser');
     let user = await JSON.parse(response)

     //Is there a storage user? 
     if (!user) {
       this.setState({
         currentUser: user,
         loggedIn: false,
         loaded: true,
       })
     }
     else {
       this.setState({
         loggedIn: true,
         loaded: true,
       })
     }
   }

  render () {

    this.loadInitialState();

    if (!this.state.loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    //When a user is offline Show Welcome screen.
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

    //When a logged in user initializes on the main screen of an application.
    return (
      //Provider - Passes the store to the children.
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} options={{ animationEnabled: false }} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} options={{ animationEnabled: false }} />
            <Stack.Screen name="Recipe" component={RecipeScreen} navigation={this.props.navigation} options={{ animationEnabled: false, headerBackTitle: 'Back' }} />
            <Stack.Screen name="Update" component={UpdateScreen} navigation={this.props.navigation} options={{ animationEnabled: false, headerBackTitle: 'Back' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;