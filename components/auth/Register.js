import React, { Component } from "react";

//Tags
import { View, Button, TextInput, Alert ,StyleSheet, Text, TouchableOpacity } from "react-native";

//AsyncStorage plugin
import AsyncStorage from "@react-native-async-storage/async-storage";

//Create a unique ID library
import uuid from 'react-native-uuid';


//style
import { GlobalStyle } from "../../styles/Global";


//Class Component(Register)
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: uuid.v4(),
            name: '',
            email: '',
            password: '',
        }
    }

    onSignUp = async () => {

        const UserProps =
        {
            token: uuid.v4(),
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        try {
            if (UserProps.name !== "" && UserProps.email !== "" && UserProps.password !== "") {
                await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/users', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(UserProps)
                }).then(res => {
                    console.log('res.status', res.status);
                    return res.json()
                }).then(result => {
                    if (result) {
                        this.storeUserData(UserProps);
                        console.log('A new user has been created!!!')
                    }
                }, (error) => {
                    console.log('No user created.')
                })
            } else {
                Alert.alert(error)
            }

        } catch (error) {
            Alert.alert('Please fill in all fields!')
        }
    }

    storeUserData = async (user) => {
        try {
            const currentUser = user;
            
            //Puts the user in storage
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (e) {
            //Saving error
            console.log("Data error.")
        }
    }
    
    validateForm =  async () => {
        let pattern =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let mailChk = pattern.test(String(this.state.email).toLowerCase());
        pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,14}/;
        let passChk = pattern.test(String(this.state.password));
        if (
          passChk == true &&
          mailChk == true &&
          this.state.name != null &&
          this.state.password == this.state.confirmPassword
        ) 
        {
          this.setState({msg:""});
          this.onSignUp()
        } 
        else   
        {
            console.log(mailChk)
            console.log(passChk)
            console.log(this.state.name)
            console.log('password '+this.state.password)
            console.log('confirm password '+this.state.confirmPassword)
        
         this.setState({msg:"Error,wrong entries or not full"})
        }
      };

      
    render() {
   
          const BackButton = ({ onPress, title }) => (
            <View style={GlobalStyle.appButtonContainer}>
              <TouchableOpacity
                style={{ backgroundColor: "#80dfff" }}
                onPress={onPress}
              >
                <Text style={GlobalStyle.appButtonText}>{title}</Text>
              </TouchableOpacity>
            </View>
          );
          const AppButton = ({ onPress, title }) => (
            <TouchableOpacity
              style={GlobalStyle.appButtonContainer}
              onPress={onPress}
            >
              <Text style={GlobalStyle.appButtonText}>{title}</Text>
            </TouchableOpacity>
          );
        return (
            <View style={GlobalStyle.box}>
            <View style={{ marginBottom: 150, alignItems: "center" }}>
              <Text style={GlobalStyle.HeadTextRegister}>CREATE AN ACCOUNT</Text>
              <TextInput
                placeholder="full Name"
                style={GlobalStyle.input}
                onChangeText={(name) => this.setState({ name })}
              />
              <TextInput
                placeholder="Email"
                style={GlobalStyle.input}
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                placeholder="Password"
                style={GlobalStyle.input}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
              <TextInput placeholder="Confirm Password"
               style={GlobalStyle.input}
               secureTextEntry={true}
               onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                />
              <AppButton
                style={GlobalStyle.Button}
                title="Sign up"
                onPress={() => this.validateForm()}
              />
              <Text>{"\n"}</Text>
              <BackButton title="go back"   onPress={() => this.props.navigation.navigate('Landing')} />
              <Text style={{ fontSize: 15, color: "red" }}>{this.state.msg}</Text>
            </View>
          </View>
            
        );
    }
}


