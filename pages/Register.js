import React from "react";
import { Text, View, Button, navigation, TextInput } from "react-native";
import { GlobalStyle } from "../styles/Global";

export const Register = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.HeadTextRegister} >CREATE AN ACCOUNT</Text>

      <TextInput placeholder="First Name" style={GlobalStyle.input} />
      <TextInput placeholder="Last Name" style={GlobalStyle.input} />
      <TextInput placeholder="Email" style={GlobalStyle.input} />
      <TextInput placeholder="Password" style={GlobalStyle.input} />
      <TextInput placeholder="Confirm Password" style={GlobalStyle.input} />
      <Button onPress={onPressHandle} title="go back" color="#5467d4" />
    </View>
  );
};
