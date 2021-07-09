import React from 'react';
import { View } from 'react-native';
import { HEHome } from '../components/Header/HEHome';
import { GlobalStyle } from '../styles/Global';

export const Home = () => {
    return (
        <View style={GlobalStyle.container}>
            <HEHome />
        </View>
    );
}