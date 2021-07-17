import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>User is logged in</Text>
            </View>
        );
    }
}

export default Main;