import React from 'react';
import { SafeAreaView } from 'react-native';
import { HERecipes } from '../components/Header/HERecipes';
import { GlobalStyle } from '../styles/Global';

export const Recipes = () => {
    return (
    <SafeAreaView style={GlobalStyle.container}>
        <HERecipes />
    </SafeAreaView>
    );
}