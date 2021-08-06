import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Alert, Button } from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';

function Save(props, { navigation }) {

    const uri = props.route.params.image; 

    const [isLoading, setLoading] = useState(false);

    const [userID, setUserID] = useState(0);
    
    const [recipeTOKEN, setRecipeTOKEN] = useState('');
    const [recipeIMG, setRecipeIMG] = useState('');
    const [recipeNAME, setRecipeNAME] = useState('');
    const [recipeTIME, setRecipeTIME] = useState('');
    const [recipeDESC, setRecipeDESC] = useState('');

    useEffect(() => {
        try {
            props.fetchUser()
            setRecipeIMG(props.route.params.image)
            setUserID(props.currentUser.id)
            setRecipeTOKEN(props.currentUser.token)
        } catch (error) {
            throw new Error(error)
        }
    }, [userID, recipeTOKEN, recipeIMG]);

    const uploadRecipe = async () => { 

        setLoading(true)

        if (recipeNAME !== '' && recipeTIME !== '' && recipeDESC !== '') {
            Promise.all([
                await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/recipes', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json; charset=UTF-8',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "recipeTOKEN": recipeTOKEN,
                        "recipeIMG": recipeIMG,
                        "recipeNAME": recipeNAME,
                        "recipeTIME": recipeTIME,
                        "recipeDESC": recipeDESC,
                    })
                }),
                await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/userRecipes', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json; charset=UTF-8',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "userID": userID,
                        "tokenUR": recipeTOKEN,
                        "recipeIMG": recipeIMG,
                        "recipeNAME": recipeNAME,
                        "recipeTIME": recipeTIME,
                        "recipeDESC": recipeDESC,
                    })
                })
            ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                console.log(data1, data2)
                if(data1 && data2) {
                    props.navigation.popToTop()
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

    //Checking the fields in the Terminal!
    console.log(recipeNAME)
    console.log(recipeTIME)
    console.log(recipeDESC)

    return (
        <View style={{ flex: 1 }}>
            {props.route.params.image && <Image style={{ flex: 0.7, aspectRatio: 1, alignSelf: 'center', marginTop: 10, }} source={{ uri: `data:image/image;base64, ${props.route.params.image}` }} /> }
            <View style={{flex: 1, margin: 10}}>
            <TextInput
                style={{margin: 10, padding: 10, borderWidth: 1}}
                placeholder="Name of Recipe"
                onChangeText={(name) => setRecipeNAME(name)}
            />
            <TextInput
                style={{margin: 10, padding: 10, borderWidth: 1}}
                placeholder="Time(Around)"
                keyboardType="numeric"
                onChangeText={(time) => setRecipeTIME(time)}
            />
            <TextInput
                style={{margin: 10, paddingLeft: 10, paddingRight: 10, height: 90, borderWidth: 1}}
                onChangeText={(caption) => setRecipeDESC(caption)}
                underlineColorAndroid="transparent"
                placeholder="Write how to prepare..."
                numberOfLines={10}
                multiline={true}
            />
            </View>
            <View style={{flex:1, marginBottom: 90}}>
            {!isLoading ? <Button title="Save" onPress={() => uploadRecipe()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
            </View>
        </View>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Save)