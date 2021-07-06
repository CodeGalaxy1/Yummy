import React from 'react';
import { Button, Text, View } from 'react-native';
import { GlobalStyle } from '../styles/Global';

export const Profile = ({navigation}) => {

    const onPressHandle = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={GlobalStyle.container}>
            <Text>My Profile</Text>
            <Button 
            onPress={onPressHandle}
            title="Logout"
            color="#5467d4"/>
        </View>
    );
}