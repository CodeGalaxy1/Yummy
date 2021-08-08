import React from 'react';

//Tags
import { View, ImageBackground,TouchableOpacity ,Text } from 'react-native';

import { GlobalStyle } from "../../styles/Global";

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={GlobalStyle.appBtnContainer}>
      <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700", textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
);

export default function Landing({ navigation }) {
    return (

        <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={{ flex: 1, flexDirection: 'column' , justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 500,}}>
          <Text style={{ fontSize: 30, fontWeight: "700", textAlign: 'center' , color: 'black'}}>Welcome To</Text>
          <Text style={{ fontSize: 50, fontWeight: "700", textAlign: 'center' , color: 'black'}}>Yummy</Text>
        </View>
          <View>
            <AppButton
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <View style={{ margin: 10 }}>
            <AppButton
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </ImageBackground>
    );
}