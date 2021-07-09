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
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={GlobalStyle.appButtonContainer}>
    <Text style={GlobalStyle.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const Login = ({ navigation }) => {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressHandle = () => {
    navigation.navigate("Register");
  };
  const onPressHandle2 = () => {
    // if(chckMail(email)&&chkPss(password))
    navigation.navigate("Home");
    
  };
const chckMail=(val)=>{
  if(isEmailValid(val))
  {
  setMsg("")
  return true
  }
  else
  {
    setMsg("invalid mail")
  return false
  }
}
const chkPss=(val)=>{
  if(isPsswordValid(val))
  {
  setMsg("")
  return true
  }
  else
  {
    setMsg("invalid Password")
  return false
  }
}

  const isEmailValid = () => {
       let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       return pattern.test(String(email).toLowerCase())
  }
  const isPsswordValid = () => {
    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,14}/
    return pattern.test(String(password))
}

  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.box}>
        <View style={GlobalStyle.textWithLink}>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Yummy
          </Text>
          <Text
            style={{
              color: "cornflowerblue",
              fontSize: 20,
              marginRight: 200,
              fontWeight: "bold",
            }}
          >
            Recipes
          </Text>
        </View>
        <Text style={GlobalStyle.HeadText}>Welcome,</Text>
        <Text
          style={{
            textAlign: "left",
            alignSelf: "stretch",
            marginLeft: 50,
            marginBottom: 53,
            fontSize: 17,
          }}
        >
          Sign in to continue
        </Text>
        {/* Error Message */}
        <Text style={{ fontSize: 15, color: "red" }}>{msg}</Text>
        <View style={GlobalStyle.IconInputContainer}>
          <Octicons style={GlobalStyle.icon} name="mail" />
          <TextInput
            placeholder="Email"
            style={GlobalStyle.inputIcon}
            onChangeText={(text) => setEmail(text)}
          />
     
        </View>
        <View style={GlobalStyle.IconInputContainer}>
          <SimpleLineIcons style={GlobalStyle.icon} name="eye" />
          <TextInput
            placeholder="Password"
            style={GlobalStyle.inputIcon}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text>{"\n"}</Text>
        <AppButton
          style={GlobalStyle.button}
          title="Login"
          color="#dc143c"
          onPress={onPressHandle2}
        />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <View style={GlobalStyle.textWithLink}>
          <Text style={{ fontSize: 16 }}>Dont have an account?</Text>
          <TouchableOpacity onPress={onPressHandle}>
            <Text style={{ fontSize: 16, color: "blue" }}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
