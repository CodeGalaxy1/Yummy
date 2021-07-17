import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';

import uuid from 'react-native-uuid';

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

        try{
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
                        this.storeData(UserProps);
                        console.log('A new user has been created!!!')
                        //this.props.navigation.navigate("Login")
                    }
                }, (error) => {
                    console.log('No user created.')
                })
            }else {
                Alert.alert(error)
            }

        } catch (error) {
            Alert.alert('Please fill in all fields!')
        }
    }

    storeData = async (user) => {
        try {
            const listOfUsers = user;
            console.log(user)
            await AsyncStorage.setItem('listOfUsers', JSON.stringify(listOfUsers));
        } catch (e) {
            // saving error
            console.log("Data error.")
        }
    }
        

    render() {

        //Checking the fields in the Terminal!
        console.log(this.state.name)
        console.log(this.state.email)
        console.log(this.state.password)

        return (
            <View>
                <TextInput 
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
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
                    onPress={() => this.onSignUp()}
                    title= "Sign Up"
                />
            </View>
        );
    }
}