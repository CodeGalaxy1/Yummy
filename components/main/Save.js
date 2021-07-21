import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Alert, Button, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';

function Save(props, { navigation }) {

    const [token, setToken] = useState('');
    const [picture, setPicture] = useState('');
    const [nameR, setNameR] = useState('');
    const [timeR, setTimeR] = useState('');
    const [descR, setDescR] = useState('');

    useEffect(() => {
        props.fetchUser()
        setPicture(props.route.params.image)
        getToken()
    }, [token], [picture]);

    const getToken = async () => {
        try {
            setToken(props.currentUser.token)
            console.log(props.currentUser.token)
        } catch (error) {
            throw new Error(error)
        }
    }

    const uploadImage = async () => {
        const uri = props.route.params.image;  

        const RecipeProps = {
            token,
            picture,
            nameR,
            timeR,
            descR,
        }
        
        if (uri !== null) {
            await fetch("http://ruppinmobile.tempdomain.co.il/site08/api/recipes", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(RecipeProps)
            }).then((res) => {
                if (res.status === 201) { return res.json(); }
                else { return "err"; }
            }).then((responseData) => {
                if (responseData.status !== "err") {
                    Alert.alert('Work');
                    props.navigation.popToTop();
                } else {
                    Alert.alert('Error uploding...');
                }
            }).catch(err => { Alert.alert('Error upload= ' + err); });
        } else {
            Alert.alert('You must go back and select an image!')
        }
    }
    
    //Checking the fields in the Terminal!
    console.log(nameR)
    console.log(timeR)
    console.log(descR)

    return (
        <View style={{ flex: 1 }}>
            {props.route.params.image && <Image style={{ flex: 0.3, aspectRatio: 1, alignSelf: 'center', marginTop: 10 }} source={{ uri: `data:image/image;base64, ${props.route.params.image}` }} /> }
            <TextInput
                style={{margin: 10}}
                placeholder="Name of Recipe"
                onChangeText={(name) => setNameR(name)}
            />
            <TextInput
                style={{margin: 10}}
                placeholder="Time(Around)"
                keyboardType="numeric"
                onChangeText={(time) => setTimeR(time)}
            />
            <TextInput
                style={{margin: 10}}
                placeholder="Write how to prepare..."
                onChangeText={(caption) => setDescR(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />           
        </View>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Save);