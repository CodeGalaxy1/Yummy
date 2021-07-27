import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';

function Profile(props, {navigation}) {

    const [userRecipes, setUserRecipes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [details, setDetails] = useState(null);
    const [button, setButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const { currentUser } = props;
    
    const getCurrentUser = async () => {
        let response = await AsyncStorage.getItem('currentUser')
        let user = await JSON.parse(response)
        return user;
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchRecipesAndFavorites();
        });
    
        return unsubscribe;
    }, [navigation]);

    const fetchRecipesAndFavorites = async () => {
        Promise.all([
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
                let user = await getCurrentUser();
                let recipes = data1.filter(function(item){
                    return user.id === item.userID;
                })
                
                let favorites = data2.filter(function(item){
                    return user.id === item.userID;
                })

                if(recipes && favorites){
                    setUserRecipes(recipes)
                    setUserFavorites(favorites)
                }
            }, (error) => {
                console.log(error)
            }).finally(() => setRefresh(false));
    }

    const switchButton = (val) => {
        setButton(val);
    }

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
        Promise.all([
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
            <Appbar.Header style={{ backgroundColor: '#fff' }}>
                <Appbar.Content title={<Text style={{fontWeight: '600'}}>Profile</Text>}/>
                <Button title="Logout" onPress={() => onLogout()}/>
            </Appbar.Header>
            <View style={styles.containerInfo}>
                <Text style={{ margin: 5 }}>{currentUser.name}</Text>
                <Text style={{ margin: 5 }}>{currentUser.email}</Text>
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
                            style={[styles.button, styles.buttonClose]}
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
        borderRadius: 20,
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