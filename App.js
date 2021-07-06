import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './components/Navigation/Navigator';

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
    </>
  );
}
