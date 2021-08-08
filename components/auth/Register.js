import React, { Component } from "react";

//Tags
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";

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
    
    validateForm = async () => {
        let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let mailChk = patternEmail.test(String(this.state.email).toLowerCase());

        let patternPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,14}/;
        let passChk = patternPassword.test(String(this.state.password));

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
         this.setState({msg:"Error,wrong entries or not full"})
        }
      };

      
    render() {
   
          const BackButton = ({ onPress, title }) => (
              <TouchableOpacity
                style={GlobalStyle.appButtonContainer}
                onPress={onPress}
              >
                <Text style={GlobalStyle.appButtonText}>{title}</Text>
              </TouchableOpacity>
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
            <View style={{flex: 1 }}>
            <View style={{flex: 1, flexDirection: "column", backgroundColor: '#cfeefa'}}>
              <Text style={{ marginTop: 70, fontSize: 40, fontWeight: "900", textAlign: "center" }}>CREATE AN ACCOUNT</Text>
              <View style={{ margin: 30, marginTop: 30}}>
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
              </View>

              <AppButton
                title="Sign Up"
                onPress={() => this.validateForm()}
              />
              
              <Text>{"\n"}</Text>
              <BackButton title="GO BACK" onPress={() => this.props.navigation.navigate('Landing')} />
              <Text style={{ fontSize: 15, color: "red" }}>{this.state.msg}</Text>
            </View>
          </View>
            
        );
    }
}


