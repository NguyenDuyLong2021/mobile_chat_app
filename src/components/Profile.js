import { View, Text } from 'react-native'
import React from 'react'
import { available } from '../themes/_availables'

export default function Profile() {
  return (
    <View style={[{marginTop: available.heightStatusBar}]}>
      <Text>Màn hình Profile</Text>
    </View>
  )
}