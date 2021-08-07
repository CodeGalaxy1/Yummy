import React from 'react';

//Tags
import { StyleSheet, View, Button, ImageBackground  } from 'react-native';


export default function Landing({ navigation }) {
    return (
        <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={styles.image}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button 
                title="Register"
                onPress={() => navigation.navigate("Register")}/>
            <Button 
                title="Login"
                onPress={() => navigation.navigate("Login")}/>
            </View>
      </ImageBackground >
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