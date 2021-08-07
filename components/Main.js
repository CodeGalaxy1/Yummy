import React, { Component } from 'react';

//Navigation(Tab) plugin
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Expo - vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Redux library
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, clearData } from '../redux/actions/index';

//Screens
import HomeScreen from './main/Home';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

//Class Component(Main)
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.clearData()
        this.props.fetchUser()
    }

    render() {
        return (
            <Tab.Navigator initialRouteName="Home" labeled={false}>
                <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}/>
                <Tab.Screen name="Add Recipe" component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    ),
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
                }}/>
            </Tab.Navigator>
        );
    }
}

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser
// })

/*
----- bindActionCreators -----
Gets actionCreators(Function or Object) and dispatch.
*/
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, clearData}, dispatch );

/*
"connect function gets 2 functions"
first funciton(mapStateToProps) - Connects the "state"
second function(mapDispatchToProps) - It connects redux operations to accessory reactions
*/
export default connect(null, mapDispatchToProps)(Main);