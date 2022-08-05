import { View, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function CustomChatButton(props) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.btnSendChat,
          {
            backgroundColor: pressed ? "#555555" : props.backgroundColor,
            ...props.styles,
          },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={props.onPress}
      >
        {props.icon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSendChat: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
});
