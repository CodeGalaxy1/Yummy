import React, { useEffect, useState } from "react";
import { GlobalStyle } from "../styles/Global";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

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
      <Text style={GlobalStyle.HeadText}>Login</Text>
      <TextInput placeholder="Email" style={GlobalStyle.input} />
      <TextInput placeholder="Password" style={GlobalStyle.input} />
      <AppButton
        style={GlobalStyle.button}
        title="Login"
        color="#dc143c"
        onPress={onPressHandle2}
      />
      <Text>{"\n"}</Text>
      <AppButton
        style={GlobalStyle.button}
        title="Register"
        color="#dc143c"
        onPress={onPressHandle}
      />
      </View>
    </View>
  );
};

