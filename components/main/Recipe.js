import React, { useRef } from 'react';
import { StyleSheet, View, Text, Animated} from 'react-native';

export default function Recipe(props) {

    const scrollA = useRef(new Animated.Value(0)).current;
    return (
        <View>
            <Animated.ScrollView
                 onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollA}}}],
                    {useNativeDriver: true},
                  )}
                >
                <View style={styles.bannerContainer}>
                    <Animated.Image style={styles.banner(scrollA)}
                        source={{ uri: `data:image/image;base64,${props.route.params.item.recipeIMG}` }}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Name: <Text style={{fontWeight: '400'}}>{props.route.params.item.recipeNAME}</Text></Text>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Time: <Text style={{fontWeight: '400'}}>{props.route.params.item.recipeTIME}</Text></Text>
                </View>
                <View style={{margin: 20}}>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Way And Components:</Text>
                    <Text style={styles.text}>
                        {props.route.params.item.recipeDESC}
                    </Text>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden'
    },
    banner: scrollA => ({
        height: 350,
        width: '100%',
        transform: [
            {
              translateY: scrollA.interpolate({
                inputRange: [-350, 0, 350, 350 + 1],
                outputRange: [-350 / 2, 0, 350 * 0.75, 350 * 0.75],
              }),
            },
            {
              scale: scrollA.interpolate({
                inputRange: [-350, 0, 350, 350 + 1],
                outputRange: [2, 1, 0.5, 0.5],
              }),
            },
          ],
    }),
    text: {
        margin: 1,
        fontSize: 16,
      },
})
