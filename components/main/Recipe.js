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
                        source={{ uri: `data:image/image;base64,${props.route.params.item.picture}` }}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Name: <Text style={{fontWeight: '400'}}>{props.route.params.item.nameR}</Text></Text>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Time: <Text style={{fontWeight: '400'}}>{props.route.params.item.timeR}</Text></Text>
                </View>
                <View style={{margin: 20}}>
                <Text style={{fontStyle: 'italic', fontWeight: '700'}}>Way And Components:</Text>
                    <Text style={styles.text}>
                        {props.route.params.item.descR}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                        semper turpis. Ut in fringilla nisl, sit amet aliquet urna. Donec
                        sollicitudin libero sapien, ut accumsan justo venenatis et. Proin iaculis
                        ac dolor eget malesuada. Cras commodo, diam id semper sodales, tortor leo
                        suscipit leo, vitae dignissim velit turpis et diam. Proin tincidunt
                        euismod elit, at porttitor justo maximus vel. Proin viverra, nibh non
                        accumsan sollicitudin, arcu metus sagittis nunc, et tempor tellus ligula
                        et justo. Pellentesque ultrices fermentum efficitur. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Praesent nec convallis nisl, et rhoncus
                        mauris. Morbi consequat sem tellus, in scelerisque lorem vehicula ut.
                        {'\n\n'}Nam vel imperdiet massa. Donec aliquet turpis quis orci fermentum,
                        eget egestas tellus suscipit. Sed commodo lectus ac augue mattis, a
                        pulvinar metus venenatis. Vestibulum cursus rhoncus mauris, fringilla
                        luctus risus eleifend ut. Vestibulum efficitur imperdiet scelerisque.
                        Pellentesque sit amet lorem bibendum, congue dolor suscipit, bibendum est.
                        Aenean leo nibh, varius vel felis nec, sagittis posuere nunc. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Duis ullamcorper laoreet orci, ac tempus dui aliquet et. Morbi
                        porta nisi sed augue vestibulum tristique. Donec nisi ligula, efficitur at
                        arcu et, sagittis imperdiet urna. Sed sollicitudin nisi eget pulvinar
                        ultricies. Ut sit amet dolor luctus massa dapibus tincidunt non posuere
                        odio. Aliquam sit amet vehicula nisi.
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
