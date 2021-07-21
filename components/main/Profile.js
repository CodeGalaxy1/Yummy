import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';

function Profile(props) {

    const { currentUser, recipes } = props;

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
            <Text>{currentUser.name}</Text>
            <Text>{currentUser.email}</Text>
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={recipes}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                        <Image
                            id={item.id}
                            style={styles.image}
                            source={{uri: `data:image/image;base64,${item.picture}`}}
                        />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
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
    recipes: store.userState.recipes
})

export default connect(mapStateToProps, null)(Profile);