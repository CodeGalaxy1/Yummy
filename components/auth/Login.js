import React, { Component } from 'react';

//Tags
import { View, Button, TextInput, Alert } from 'react-native';

//AsyncStorage plugin
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalStyle } from "../../styles/Global";

//Class Component(Login)
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            currentUser: null,
        }
    }

    onSignIn = async () => {
        try {
            if (this.state.email !== "" && this.state.password !== "") {
                await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/users', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                }).then(res => {
                    console.log('res.status', res.status);
                    return res.json()
                }).then(result => {
                    this.setState({
                        currentUser: result.find((user) => user.email === this.state.email && user.password === this.state.password)
                    })
                    if (result && this.state.currentUser) {
                        this.storeUserData(this.state.currentUser);
                    }
                }, (error) => {
                    console.log(error)
                })
            } else {
                Alert.alert(error)
            }

        } catch (error) {
            Alert.alert('Please fill in all fields!')
        }
    }

    storeUserData = async (currentUser) => {
        try {
            //Before, Remove user from storage
            await AsyncStorage.removeItem('currentUser');

            //After, Puts the user in storage
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (e) {
            //Saving error
            console.log("Data error.")
        }
    }

    render() {

        return (
            <View>
                <TextInput
                    placeholder="email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignIn()}
                    title="Sign In"
                />
            </View>
        );
    }
}