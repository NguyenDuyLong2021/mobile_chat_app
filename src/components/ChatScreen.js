import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web'

const ChatScreen = () => {
    return(
        <View style={style.container}>
            <Text> ChatScreen </Text>
            <Button title="Click here" onPress={() =>{}}/>
        </View>
    );

};
export default ChatScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
