import React from 'react';

//Tags
import { StyleSheet, View, Button, ImageBackground,TouchableOpacity ,Text } from 'react-native';

import { GlobalStyle } from "../../styles/Global";

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={GlobalStyle.appButtonContainer}>
      <Text style={GlobalStyle.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

export default function Landing({ navigation }) {
    return (

        <ImageBackground source={require('../../assets/food.png')} resizeMode="cover" style={GlobalStyle.boxLanding}>
   
        <Text style={{ marginBottom: 80, fontSize: 30,color:'black' }}>Welcome to Yummy</Text>
        <ImageBackground source={require('../../assets/background.png')}  style={GlobalStyle.innerBox}>
          <View style={{ paddingTop: 30, paddingBottom: 100 }}>
            <AppButton
              style={GlobalStyle.buttonInBox}
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <View style={{ paddingBottom: 50 }}>
            <AppButton
              style={{ paddingTop: 20 }}
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </ImageBackground>
      </ImageBackground>

  
    );
}

//Css
const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%',
      height: '100%'
    },
  });