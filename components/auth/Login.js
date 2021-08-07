import React, { Component } from "react";

//Tags
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

//AsyncStorage plugin
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyle } from "../../styles/Global";

import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

//Class Component(Login)
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
    };
  }

  onSignIn = async () => {
    try {
      if (this.state.email !== "" && this.state.password !== "") {
        await fetch("http://ruppinmobile.tempdomain.co.il/site08/api/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            console.log("res.status", res.status);
            return res.json();
          })
          .then(
            (result) => {
              this.setState({
                currentUser: result.find(
                  (user) =>
                    user.email === this.state.email &&
                    user.password === this.state.password
                ),
              });
              if (result && this.state.currentUser) {
                this.storeUserData(this.state.currentUser);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        Alert.alert(error);
      }
    } catch (error) {
      Alert.alert("Please fill in all fields!");
    }
  };

  storeUserData = async (currentUser) => {
    try {
      //Before, Remove user from storage
      await AsyncStorage.removeItem("currentUser");

      //After, Puts the user in storage
      await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
    } catch (e) {
      //Saving error
      console.log("Data error.");
    }
  };

  render() {
    const AppButton = ({ onPress, title }) => (
      <TouchableOpacity
        onPress={onPress}
        style={GlobalStyle.appButtonContainer}
      >
        <Text style={GlobalStyle.appButtonText}>{title}</Text>
      </TouchableOpacity>
    );
    return (
      <View style={GlobalStyle.container}>
        <View style={GlobalStyle.box}>
          <View style={GlobalStyle.textWithLink}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "sans-serif-condensed",
              }}
            >
              Yummy
            </Text>
            <Text
              style={{
                color: "cornflowerblue",
                fontSize: 20,
                marginRight: 200,
                fontFamily: "sans-serif-condensed",
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

          <View style={GlobalStyle.IconInputContainer}>
            <Octicons style={GlobalStyle.icon} name="mail" />
            <TextInput
              placeholder="Email"
              style={GlobalStyle.inputIcon}
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View style={GlobalStyle.IconInputContainer}>
            <SimpleLineIcons style={GlobalStyle.icon} name="eye" />
            <TextInput
              placeholder="Password"
              style={GlobalStyle.inputIcon}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <Text>{"\n"}</Text>
          <AppButton
            style={GlobalStyle.button}
            title="Login"
            color="#dc143c"
            onPress={() => this.onSignIn()}
          />

          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
          <View style={GlobalStyle.textWithLink}>
            <Text style={{ fontSize: 16 }}>Dont have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 16, color: "blue" }}> Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
