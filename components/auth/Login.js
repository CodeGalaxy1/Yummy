import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
                    let currentUser = result.find((user) => user.email === this.state.email && user.password === this.state.password)
                    if (result && currentUser) {
                        this.storeUserData(currentUser);
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

    storeUserData = async (user) => {
        try {
            await AsyncStorage.removeItem('currentUser');
            const currentUser = user;
            await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (e) {
            // saving error
            console.log("Data error.")
        }
    }

    render() {

        //Checking the fields in the Terminal!
        console.log(this.state.email)
        console.log(this.state.password)

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