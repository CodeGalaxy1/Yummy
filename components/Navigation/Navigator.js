import React from 'react';

//Type Navigator
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icons
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

//Pages
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Home } from '../../pages/Home';
import { Camera } from '../../pages/Camera';
import { Recipes } from '../../pages/Recipes';
import { Favorite } from '../../pages/Favorite';
import { Profile } from '../../pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#f2709c",
                inactiveTintColor: "#e4e6eb",
                style: {
                    backgroundColor: "#190009",
                },
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                //tabBarLabel: () => { return null },
                tabBarLabel: "HOME",
                tabBarIcon: ({ color}) => (
                    <AntDesign name="home" color={color} size={24} />
                ),
            }}
            />
            <Tab.Screen name="Camera" component={Camera} options={{
                //tabBarLabel: () => { return null },
                tabBarLabel: "CAMERA",
                tabBarIcon: ({ color}) => (
                    <SimpleLineIcons name="camera" color={color} size={24} />
                ),
            }}
            />
            <Tab.Screen name="Recipes" component={Recipes} options={{
                tabBarLabel: () => { return null },
                tabBarIcon: ({ color}) => (
                    <MaterialCommunityIcons name="chef-hat" color={color} size={40} />
                ),
            }}
            />
            <Tab.Screen name="Favorite" component={Favorite} options={{
                //tabBarLabel: () => { return null },
                tabBarLabel: "LIKES",
                tabBarIcon: ({ color}) => (
                    <AntDesign name="hearto" color={color} size={24} />
                ),
            }}
            />
            <Tab.Screen name="Profile" component={Profile} options={{
                //tabBarLabel: () => { return null },
                tabBarLabel: "ME",
                tabBarIcon: ({ color, focused }) => (
                    <AntDesign name="user" color={color} size={24} />
                ),
            }}
            />
        </Tab.Navigator>
    );
}

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} options={{ animationEnabled: false, }} />
            <Stack.Screen name="Register" component={Register} options={{ animationEnabled: false, }} />
            <Stack.Screen name="Home" component={TabNavigator} options={{ animationEnabled: false, }}  />
        </Stack.Navigator>
    );
}

export default StackNavigator;