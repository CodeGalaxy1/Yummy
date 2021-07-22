import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';

import { connect } from 'react-redux';

function Profile(props) {
    const { currentUser, recipes } = props;

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
            <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            </View>
            {recipes.length === 0 ?
                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                    <Image 
                        style={{ width: 150, height: 150 }} 
                        source={require('../../images/Does-not-exist.png')}
                    />
                    <Text style={{ color: "gray"}}>You have no recipes.</Text>
                </View>
                :
                <View style={styles.containerGallery}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={recipes}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item }) => (
                            <View style={styles.containerImage}>
                                <Image
                                    id={item.id}
                                    style={styles.image}
                                    source={{ uri: `data:image/image;base64,${item.picture}` }}
                                />
                            </View>
                        )}
                    />
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20
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
    recipes: store.userState.recipes
})


export default connect(mapStateToProps, null)(Profile);