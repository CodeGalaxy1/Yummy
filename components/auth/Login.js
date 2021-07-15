import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    onSignIn = async () => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json charset=UTF-8'
            },
        }).then(res => {
            console.log('res.status', res.status);
            return res.json()
        }).then((result) => {
            console.log(result);
            if (result) {
                console.log('User logged in!!!')
            }
        }, (error) => {
            console.log('Login error.')
        });
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignIn()}
                    title= "Sign In"
                />
            </View>
        );
    }
}