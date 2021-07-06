import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyle } from '../styles/Global';

export const Home = () => {
    return (
        <View style={GlobalStyle.container}>
            <Text>Home</Text>
        </View>
    );
}