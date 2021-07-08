import React, { useEffect, useState } from "react";
import { Text, View, Button, navigation, TextInput } from "react-native";
import { GlobalStyle } from "../styles/Global";

export const Register = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate("Login");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.HeadTextRegister} >CREATE AN ACCOUNT</Text>

      <TextInput placeholder="First Name" style={GlobalStyle.input}  onChangeText={(text) => setName(text)} />
      <TextInput placeholder="Last Name" style={GlobalStyle.input} onChangeText={(text) => setLastName(text)}/>
      <TextInput placeholder="Email" style={GlobalStyle.input} onChangeText={(text) => setEmail(text)}/>
      <TextInput placeholder="Password" style={GlobalStyle.input} onChangeText={(text) => setPassword(text)}/>
      <TextInput placeholder="Confirm Password" style={GlobalStyle.input} onChangeText={(text) => setConPassword(text)}/>
      <Button onPress={onPressHandle} title="go back" color="#5467d4" />
    </View>
  );
};
