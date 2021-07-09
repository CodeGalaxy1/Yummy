import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './components/Navigation/Navigator';
import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
    </>
  );
}
