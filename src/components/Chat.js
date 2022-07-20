import { View, Text } from 'react-native'
import React from 'react'
import { availabels } from '../themes/_availables'

export default function Chat() {
  return (
    <View style={[{marginTop: availabels.heightStatusBar}]}>
      <Text>Màn hình chat</Text>
    </View>
  )
}