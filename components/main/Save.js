import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Alert, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';

import { ActivityIndicator, Colors } from 'react-native-paper';

function Save(props, { navigation }) {

    const [isLoading, setLoading] = useState(false);

    const [token, setToken] = useState('');
    const [picture, setPicture] = useState('');
    const [nameR, setNameR] = useState('');
    const [timeR, setTimeR] = useState('');
    const [descR, setDescR] = useState('');

    useEffect(() => {
        try {
            props.fetchUser()
            setPicture(props.route.params.image)
            setToken(props.currentUser.token)
        } catch (error) {
            throw new Error(error)
        }
    }, [token, picture]);

    const uploadImage = async () => {
        const uri = props.route.params.image;  

        const RecipeProps = {
            "token": token,
            "picture": picture,
            "nameR": nameR,
            "timeR": timeR,
            "descR": descR,
        }

        setLoading(true)

        if (uri !== null) {

            let response = await fetch("http://ruppinmobile.tempdomain.co.il/site08/api/recipes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(RecipeProps)
            })
            let data = await response.json()
            if(data) {
                console.log(data)
                props.navigation.popToTop()
                setLoading(false)
            }
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
            {props.route.params.image && <Image style={{ flex: 0.3, aspectRatio: 1, alignSelf: 'center', marginTop: 10, }} source={{ uri: `data:image/image;base64, ${props.route.params.image}` }} /> }
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
            <View style={{flex:1}}>
            {!isLoading ? <Button title="Save" onPress={() => uploadImage()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
            </View>
        </View>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Save);