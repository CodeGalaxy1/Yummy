import React, { Component } from "react";

//Tags
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

//AsyncStorage plugin
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyle } from "../../styles/Global";

import { Octicons, SimpleLineIcons } from "@expo/vector-icons";

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
        style={{backgroundColor: "#0099e6", justifyContent: "center", alignItems: "center", margin: 30, padding: 20, borderRadius: 10}}
      >
        <Text style={GlobalStyle.appButtonText}>{title}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "column", backgroundColor: '#cfeefa'}}>
          <Text style={{ marginTop: 70, fontSize: 40, fontWeight: "700", textAlign: "left", marginLeft: 30}}>SIGN UP,</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", marginLeft: 30}}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "500"}}>Yummy</Text>
            <Text style={{ color: "cornflowerblue", fontSize: 18, fontWeight: "500"}}>Recipes</Text>
          </View>

        <View style={{ margin: 30 , marginTop: 80}}>  
          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 4}}>
            <Octicons style={{ fontSize: 20, marginTop: 15, marginLeft: 10 }} name="mail" />
            <TextInput
              placeholder="Email"
              style={GlobalStyle.inputIcon}
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 4, marginTop: 10}}>
            <SimpleLineIcons style={{ fontSize: 20, marginTop: 15, marginLeft: 10 }} name="eye" />
            <TextInput
              placeholder="Password"
              style={GlobalStyle.inputIcon}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          </View>

          <AppButton
            title="Login"
            color="#dc143c"
            onPress={() => this.onSignIn()}
          />

          <View style={GlobalStyle.textWithLink}>
            <Text style={{ fontSize: 16 }}>Dont have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={{ fontSize: 16, color: "blue" }}> Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
