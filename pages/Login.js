import React, { useEffect, useState } from "react";
import { GlobalStyle } from "../styles/Global";


import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { AntDesign, Octicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={GlobalStyle.appButtonContainer}>
    <Text style={GlobalStyle.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const Login = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate("Register");
  };
  const onPressHandle2 = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={GlobalStyle.container}>
  
        <View style={GlobalStyle.box}>
        <View style={GlobalStyle.textWithLink}>
        <Text style={{color:"black",fontSize:20,fontWeight:'bold',fontFamily:'sans-serif-condensed'}}>Yummy</Text>
        <Text style={{color:"cornflowerblue",fontSize:20,marginRight:200,fontFamily:'sans-serif-condensed',fontWeight:'bold'}}>Recipes</Text>
        </View>
      <Text style={GlobalStyle.HeadText}>Welcome,</Text>
      <Text style={{textAlign:"left",alignSelf:"stretch",marginLeft:50,marginBottom:53,fontSize:17}}>Sign in to continue</Text>
      <View style={GlobalStyle.IconInputContainer}>
      <Octicons style={GlobalStyle.icon} name="mail"/>
      <TextInput placeholder="Email" style={GlobalStyle.inputIcon} />
      </View>
      <View style={GlobalStyle.IconInputContainer}>
      <SimpleLineIcons style={GlobalStyle.icon} name="eye"/>
      <TextInput placeholder="Password" style={GlobalStyle.inputIcon} />
      </View>
      <Text>{"\n"}</Text>
      <AppButton
        style={GlobalStyle.button}
        title="Login"
        color="#dc143c"
        onPress={onPressHandle2}
      />
      <Text>{"\n"}</Text>
      {/* <AppButton
        style={GlobalStyle.button}
        title="Register"
        color="#dc143c"
        onPress={onPressHandle}
      /> */}
       <Text>{"\n"}</Text>
      <View style={GlobalStyle.textWithLink}>
       <Text style={{fontSize:16}}>Dont have an account?</Text>
     
       <TouchableOpacity onPress={onPressHandle} >
       <Text style={{fontSize:16,color:'crimson'}}> Signup</Text>
  </TouchableOpacity>
       </View>
      </View>
      
    </View>
  );
};

