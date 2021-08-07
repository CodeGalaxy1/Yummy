import React, { useState, useEffect } from 'react';

//Tags
import { View, TextInput, Image, Alert, Button, Picker, ScrollView } from 'react-native';

//Element - react-native-paper
import { ActivityIndicator, Colors } from 'react-native-paper';

//AsyncStorage plugin
import AsyncStorage from '@react-native-async-storage/async-storage';

//Functional Component(Update)
function Update(props, { navigation }) {

    const [isLoading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState("min");

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
<ScrollView contentContainerStyle={{ flexGrow: 1, height: 1000 }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {props.route.params.details.recipeIMG && <Image style={{ flex: 1, aspectRatio: 1, alignSelf: 'center', marginTop: 10, }} source={{ uri: `data:image/image;base64, ${props.route.params.details.recipeIMG}` }} />}
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
                <View style={{flex:1}}>
                    {!isLoading ? <Button title="Update" onPress={() => UpdateRecipe()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
                </View>
            </View>
        </ScrollView>
    );
}

export default Update;

{/* <View style={{flex:1}}>
{!isLoading ? <Button title="Update" onPress={() => UpdateRecipe()} /> : <ActivityIndicator animating={true} color={Colors.blue500} />}
</View> */}