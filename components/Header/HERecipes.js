import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyle } from '../../styles/Global';

export const HERecipes = () => {
    return (
        <View style={GlobalStyle.headerRecipesPage}>
            <Text style={{ fontSize: 30, fontWeight: '700' }}>Yum</Text>
        </View>
    );
}