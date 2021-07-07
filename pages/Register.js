import React from 'react';
import { Text, View,Button,navigation } from 'react-native';
import { GlobalStyle } from '../styles/Global';

export const Register = ({navigation}) => {
    
const onPressHandle = () => {
    navigation.navigate('Login');
}
    return (
        <View style={GlobalStyle.container}>
            <Text>Must Register!</Text>
            <Button 
            onPress={onPressHandle}
            title="go back"
            color="#5467d4"/>
        </View>
    );
}