import React, {Component} from 'react'
import {
    Text,
    View,
} from 'react-native'


function UIHeader(props) {
    const {
        title
    } = props
    return <View style={{
        width: 358,
        marginTop: 30,
        height: 60,
        backgroundColor: '#E1E1E1E1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
     <Text style={{
            left: 115,
            fontSize: 25,
            alignSelf:'center',
            lineHeight: 50,
            color: 'black'
        }}>{title}</Text>
    </View>
}
export default UIHeader