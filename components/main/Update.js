import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Alert, Button } from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Update(props, { navigation }) {

    const [isLoading, setLoading] = useState(false);

    const [recipeTOKEN, setRecipeTOKEN] = useState('');
    const [recipeIMG, setRecipeIMG] = useState('');
    const [recipeNAME, setRecipeNAME] = useState('');
    const [recipeTIME, setRecipeTIME] = useState('');
    const [recipeDESC, setRecipeDESC] = useState('');

    useEffect(() => {
        try {
            setRecipeTOKEN(props.route.params.details.tokenUR)
            setRecipeIMG(props.route.params.details.recipeIMG)
        } catch (error) {
            throw new Error(error)
        }
    }, [recipeTOKEN, recipeIMG]);

    const getCurrentUser = async () => {
        let response = await AsyncStorage.getItem('currentUser')
        let user = await JSON.parse(response)
        return user;
    }

    const UpdateRecipe = async () => { 

        let user = await getCurrentUser();

        const recipeID = props.route.params.details.recipeID;
        console.log(recipeID)

        setLoading(true)

        if (recipeNAME !== '' && recipeTIME !== '' && recipeDESC !== '') {
            Promise.all([
                await fetch("http://ruppinmobile.tempdomain.co.il/site08/api/recipes" + "/" + recipeID, {
                method: 'PUT',
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json'
                }),
                body: JSON.stringify({
                    "recipeID": recipeID,
                    "recipeTOKEN": recipeTOKEN,
                    "recipeIMG": recipeIMG,
                    "recipeNAME": recipeNAME,
                    "recipeTIME": recipeTIME,
                    "recipeDESC": recipeDESC,
                    "likes": false
                }),
            }),
                await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/userRecipes' + "/" + recipeID, {
                    method: 'PUT',
                    headers: new Headers({
                        'Accept': 'application/json; charset=UTF-8',
                        'Content-type': 'application/json'
                    }),
                    body: JSON.stringify({
                        "userID": user.id,
                        "recipeID": recipeID,
                        "tokenR": recipeTOKEN,
                        "recipeIMG": recipeIMG,
                        "recipeNAME": recipeNAME,
                        "recipeTIME": recipeTIME,
                        "recipeDESC": recipeDESC,
                        "likes": false
                    }),
                }),
            ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                console.log(data1, data2)
                if(data1 && data2) {
                    props.navigation.popToTop()
                    setLoading(false)
                }else {
                    alert('error')
                    setLoading(false)
                }
            }, (error) => {
                console.log(error)
            });

        } else {
            Alert.alert('All fields are required!')
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Image style={{ flex: 0.3, aspectRatio: 1, alignSelf: 'center', marginTop: 10, }} source={{ uri: `data:image/image;base64, ${props.route.params.details.recipeIMG}` }} />
            <TextInput
                style={{margin: 10}}
                placeholder="Name of Recipe"
                onChangeText={(name) => setRecipeNAME(name)}
            />
            <TextInput
                style={{margin: 10}}
                placeholder="Time(Around)"
                keyboardType="numeric"
                onChangeText={(time) => setRecipeTIME(time)}
            />
            <TextInput
                style={{margin: 10}}
                placeholder="Write how to prepare..."
                onChangeText={(caption) => setRecipeDESC(caption)}
            />
            <View style={{flex:1}}>
            {!isLoading ? <Button title="Update" onPress={() => UpdateRecipe()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
            </View>
        </View>
    );
}

export default Update;