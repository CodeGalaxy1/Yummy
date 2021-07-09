import React from 'react';
import { SafeAreaView } from 'react-native';
import { HEHome } from '../components/Header/HEHome';
import { GlobalStyle } from '../styles/Global';

export const Home = () => {
    return (
        <SafeAreaView style={GlobalStyle.container}>
            <HEHome />
        </SafeAreaView>
    );
}