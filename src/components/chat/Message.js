import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Message(props) {
  return (
    <View
      style={
        props.typeMessage === 0
          ? [styles.messageStyle, styles.sendStyle]
          : [styles.messageStyle, styles.replyStyle]
      }
    >
      <Text style={styles.messageText}>{props.message}</Text>
      <Text style={styles.time}>{props.time}</Text>
      {props.typeMessage === 0 && props.checkMessage === true ? (
        <Ionicons
          style={styles.checkMessage}
          name="checkmark-done"
          size={16}
          color="#1BD78F"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 18,
  },
  messageStyle: {
    width: "80%",
    marginTop: 10,
    padding: 10,
    borderRadius: 16,
    flexDirection: "row",
    position: "relative",
  },
  sendStyle: {
    backgroundColor: "#EAFFF3",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  replyStyle: {
    backgroundColor: "#F4F6F9",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  time: {
    fontSize: 10,
    position: "absolute",
    right: 18,
    bottom: 5,
  },
  checkMessage: {
    position: "absolute",
    right: 1,
    bottom: 3,
  },
});
