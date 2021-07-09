import React from 'react';
import { View } from 'react-native';
import { HERecipes } from '../components/Header/HERecipes';
import { GlobalStyle } from '../styles/Global';

export const Recipes = () => {
    return (
    <View style={GlobalStyle.container}>
        <HERecipes />
    </View>
    );
}