import React, { useState, useEffect } from 'react';

//Tags
import { View, TextInput, Image, Alert, Button, Picker, ScrollView } from 'react-native';

//Element - react-native-paper
import { ActivityIndicator, Colors } from 'react-native-paper';

//Redux library
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../redux/actions/index';

//Functional Component(Profile)
function Save(props, { navigation }) {

    const uri = props.route.params.image; 

    const [isLoading, setLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState("min");
    const [userID, setUserID] = useState(0);
    
    const [recipeTOKEN, setRecipeTOKEN] = useState('');
    const [recipeIMG, setRecipeIMG] = useState('');
    const [recipeNAME, setRecipeNAME] = useState('');
    const [recipeTIME, setRecipeTIME] = useState('');
    const [recipeDESC, setRecipeDESC] = useState('');

    useEffect(() => {
        try {
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

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, height: 1000 }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {props.route.params.image && <Image style={{ flex: 1, aspectRatio: 1, alignSelf: 'center', marginTop: 10, }} source={{ uri: `data:image/image;base64, ${props.route.params.image}` }} />}
                <View style={{ margin: 10, textAlign: 'left' }}>
                    <TextInput
                        style={{ margin: 10, padding: 20, borderWidth: 1 }}
                        placeholder="Name of Recipe"
                        onChangeText={(name) => setRecipeNAME(name)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput
                            style={{ margin: 10, padding: 20, borderWidth: 1, width: 150 }}
                            placeholder="Time(Around)"
                            keyboardType="numeric"
                            maxLength={2}
                            onChangeText={(time) => setRecipeTIME(time + ' ' + selectedValue)}
                        />
                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: 180, height: 44 }}
                            itemStyle={{ height: 44 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="sec" value="sec" />
                            <Picker.Item label="min" value="min" />
                            <Picker.Item label="hour" value="hour" />
                        </Picker>
                    </View>
                    <TextInput
                        style={{ margin: 10, padding: 20, paddingTop: 20, height: 200, borderWidth: 1 }}
                        onChangeText={(caption) => setRecipeDESC(caption)}
                        underlineColorAndroid="transparent"
                        placeholder="Write how to prepare..."
                        numberOfLines={1}
                        multiline={true}
                    />
                </View>
                <View style={{ flex: 1, marginBottom: 150 }}>
                    {!isLoading ? <Button title="Save" onPress={() => uploadRecipe()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(Save)