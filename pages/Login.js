import React from 'react';
import { Button, Text, View } from 'react-native';
import { GlobalStyle } from '../styles/Global';

export const Login = ({navigation}) => {

    const onPressHandle = () => {
        navigation.navigate('Register');
    }
    const onPressHandle2 = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={GlobalStyle.container}>
            <Text>Login</Text>
            <Button
                onPress={onPressHandle}
                title="Go To Register Page"
                color="#5467d4"
            />
            <Button
                onPress={onPressHandle2}
                title="Go To Home Page"
                color="#cc0000"
            />
        </View>
    );
}