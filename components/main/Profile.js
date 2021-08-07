import React, { useEffect, useState } from 'react';

//Tags
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';

//Element Header from react-native-paper library
import { Appbar } from 'react-native-paper';

//Expo - vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//AsyncStorage plugin
import AsyncStorage from '@react-native-async-storage/async-storage';

//Redux library
import { connect } from 'react-redux';

//Functional Component(Profile)
function Profile(props, {navigation}) {

    const [userRecipes, setUserRecipes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [details, setDetails] = useState(null);
    const [button, setButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const { currentUser } = props;

    useEffect(() => {
        fetchRecipesAndFavorites();
    }, [])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchRecipesAndFavorites();
        });
    
        return unsubscribe;
    }, [navigation]);

    const fetchRecipesAndFavorites = async () => {
        await Promise.all([
            await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/userRecipes', {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json'
                }),
            }),
            await fetch("http://ruppinmobile.tempdomain.co.il/site08/api/favorites", {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json'
                }),
            })
        ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(async ([data1, data2]) => {

                setRefresh(true)

                //Filter the information (recipes) of the current user
                let recipes = await data1.filter(function(item){
                    return currentUser.id === item.userID;
                })
                
                //Filter the information (favorite) of the current user
                let favorites = await data2.filter(function(item){
                    return currentUser.id === item.userID;
                })

                if(recipes && favorites){
                    setUserRecipes(recipes)
                    setUserFavorites(favorites)
                }else {
                    setUserRecipes([])
                    setUserFavorites([])
                }
            }, (error) => {
                console.log(error)
            }).finally(() => setRefresh(false));
    }

    //Buttons - My recipes or Favorites
    const switchButton = (val) => {
        setButton(val);
    }

    //Logout
    const onLogout = () => {
        AsyncStorage.removeItem('currentUser');
    }

    const updateRecipe = async() => {
        Alert.alert(
            'Change Recipe',
            'Are you sure you want to change the recipe?',
            [
              {text: 'NO', onPress: () => props.navigation.navigate("Profile"), style: 'cancel'},
              {text: 'YES', onPress: () => props.navigation.navigate("Update", { details })},
            ]
        );
        setTimeout(() => {
            setModalVisible(!modalVisible)
        }, 3000);
    }

    const deleteRecipe = async () => {
        await Promise.all([
            await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/recipes' + `/${details.recipeID}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json'
                })
            }),
            await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/userRecipes' + `/${details.recipeID}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Accept': 'application/json; charset=UTF-8',
                    'Content-type': 'application/json'
                })
            })
        ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                console.log(data1, data2)
                setModalVisible(!modalVisible);
            }, (error) => {
                console.log(error)
            });
    }

    return (

        <View style={styles.container}>
             <View style={{backgroundColor: '#FFF'}}>
             <View style={{paddingTop:50, backgroundColor: '#FFF' }}>
            <Appbar.Header style={{ marginTop:40,backgroundColor: '#e6f2ff' }}>
                <Appbar.Content style={{paddingBottom:50}} title={<Text style={{fontWeight: '600'}}>Profile</Text>}/>
                <View style={{paddingBottom:50}}>
                <Button style={{}} title="Logout" onPress={() => onLogout()}/>
                </View>
            </Appbar.Header>
         
             </View>
            <View style={styles.containerInfo}>
                <Text style={{ margin: 5 }}>{currentUser !== undefined ? currentUser.name: undefined}</Text>
                <Text style={{ margin: 5 }}>{currentUser !== undefined ? currentUser.email: undefined}</Text>
            </View>
            <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{
                    width: '50%', borderBottomWidth: button ? 2 : 1,
                    borderBottomColor: button ? '#000' : 'lightgray'
                }}
                    onPress={() => switchButton(true)}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', color: button ? '#000' : 'gray' }}>My</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '50%', borderBottomWidth: button ? 1 : 2,
                    borderBottomColor: !button ? '#000' : 'lightgray'
                }}
                    onPress={() => switchButton(false)}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500', color: button ? 'gray' : '#000' }}>Favorites</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/*----- My Recipes -----*/}
            {userRecipes && button &&
                <View style={styles.containerGallery}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={userRecipes}
                        refreshing={refresh}
                        onRefresh={() => { fetchRecipesAndFavorites(); }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.containerImage} 
                                activeOpacity={0.9} onPress={() => props.navigation.navigate("Recipe", { item })} 
                                onLongPress={() => {
                                    setModalVisible(true);
                                    setDetails(item);
                                }}
                            >
                                <Image
                                    id={item.id}
                                    style={styles.image}
                                    source={{ uri: `data:image/image;base64,${item.recipeIMG}` }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>}

            {/*----- Favorites -----*/}
            {userFavorites && !button &&
                <View style={styles.containerGallery}>
                 <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userFavorites}
                    refreshing={refresh}
                    onRefresh={() => { fetchRecipesAndFavorites(); }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.containerImage} 
                            activeOpacity={0.9} onPress={() => props.navigation.navigate("Recipe", { item })}>
                            <Image
                                id={item.id}
                                style={styles.image}
                                source={{ uri: `data:image/image;base64,${item.recipeIMG}` }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            }

            {/*----- Modal -----*/}
            {modalVisible && <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Pressable
                            style={[styles.button, styles.buttonUpdate]}
                            onPress={() => updateRecipe()}
                        >
                            <Text style={styles.textStyle}>Update Recipe</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => deleteRecipe()}
                        >
                            <Text style={styles.textStyle}>Remove Recipe</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonX, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <MaterialCommunityIcons name="close" color={'#fff'} size={26} />
                        </Pressable>
                    </View>
                </View>
            </Modal>}
        </View>

    );
}

//Css
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        margin: 0.5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonX: {
        borderRadius: 50,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonUpdate: {
        padding: 18,
        backgroundColor: "#fd7e14",
    },
    buttonDelete: {
        padding: 18,
        backgroundColor: "#dc3545",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(Profile);