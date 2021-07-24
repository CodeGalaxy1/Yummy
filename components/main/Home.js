import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, Button, TouchableOpacity } from 'react-native';
import { Appbar, Card, Title } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home(props, { navigation }) {

    const [userRecipes, setUserRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [like, setLike] = useState(false);

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

    const chgFavorite = () => {
        setLike(!like)
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={{ backgroundColor: '#fff' }}>
                <Appbar.Content title={<Text style={{ fontWeight: '600' }}>Yummy</Text>} subtitle="Home" />
            </Appbar.Header>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={userRecipes}
                    refreshing={refresh}
                    onRefresh={() => { fetchRecipes(); }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 50, backgroundColor: '#f5f5f5' }}>
                            <Card.Content>
                                <Title>{item.nameR}</Title>
                                <View style={styles.containerImage}>
                                    <Image
                                        id={item.id}
                                        style={styles.image}
                                        source={{ uri: `data:image/image;base64,${item.picture}` }}
                                    />
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => chgFavorite()}>
                                                <MaterialCommunityIcons id={item.token} name={like ? "heart" : "heart-outline"} color={'#000'} size={30} />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 16 }}> likes</Text>
                                        </View>
                                        <Button title="More" onPress={() => props.navigation.navigate("Recipe", { item })} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5, marginBottom: 10 }}>
                                        <Text>{(item.descR.length > 30) ? (((item.descR).substring(0, 30 - 3)) + '...') : item.descR}</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 4
    }
})