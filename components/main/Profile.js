import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile(props, {navigation}) {

    const [userRecipes, setUserRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [button, setButton] = useState(true);

    const { currentUser } = props;

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchRecipes()
        });
    
        return unsubscribe;
    }, [navigation]);

    const fetchRecipes = async () => {
        setRefresh(true)
        await fetch('http://ruppinmobile.tempdomain.co.il/site08/api/recipes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        }).then(res => {
            console.log('res.status', res.status);
            return res.json()
        }).then(async (result) => {
            if (result) {
                setUserRecipes(result)
            } else {
                console.log('error')
            }
        }).finally(() => setRefresh(false))
    }

    const switchButton = (val) => {
        setButton(val);
    }

    const onLogout = () => {
        AsyncStorage.removeItem('currentUser');
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
                //  <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                //      <MaterialCommunityIcons name="alert-circle-outline" color={'gray'} size={100} />
                //      <Text style={{ color: "gray", fontSize: 16 }}>You have no recipes.</Text>
                //  </View>
                //  :
                <View style={styles.containerGallery}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={userRecipes}
                        refreshing={refresh}
                        onRefresh={() => { fetchRecipes(); }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.containerImage} activeOpacity={0.9} onPress={() => props.navigation.navigate("Recipe", { item })}>
                                <Image
                                    id={item.id}
                                    style={styles.image}
                                    source={{ uri: `data:image/image;base64,${item.picture}` }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>}
            {userRecipes && !button &&
                // <View style={styles.containerGallery}>
                //     <FlatList
                //         numColumns={3}
                //         horizontal={false}
                //         data={userRecipes}
                //         refreshing={refresh}
                //         onRefresh={() => { fetchRecipes(); }}
                //         keyExtractor={(item, index) => index}
                //         renderItem={({ item }) => (
                //             <TouchableOpacity style={styles.containerImage} activeOpacity={0.9} onPress={() => props.navigation.navigate("Recipe", { item })}>
                //                 <Image
                //                     id={item.id}
                //                     style={styles.image}
                //                     source={{ uri: `data:image/image;base64,${item.picture}` }}
                //                 />
                //             </TouchableOpacity>
                //         )}
                //     />
                // </View>
                <Text>123</Text>
            }
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
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1,
        margin: 0.5,
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})


export default connect(mapStateToProps, null)(Profile);