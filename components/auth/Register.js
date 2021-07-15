import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }

    onSignUp = async () => {
        const UserProps =
        {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

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
                this.storeData(UserProps);
                console.log('A new user has been created!!!')
            }
        }, (error) => {
            console.log('No user created.')
        })
    }

    storeData = async (values) => {
        try {
            const jsonValue = JSON.stringify(values)
            await AsyncStorage.setItem('Token', jsonValue)
        } catch (e) {
            // saving error
            console.log("Data error.")
        }
    }
        

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
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
                    onPress={() => this.onSignUp()}
                    title= "Sign Up"
                />
            </View>
        );
    }
}