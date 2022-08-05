import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

// data: dữ liệu nhận vào là đối tượng message
// typeMessage: loại tin nhắn nếu 0 là tin nhắn gửi, 1 là tin nhắn nhận
// message: tin nhắn nhận vào để hiển thị
// checkMessage: hiện icon check tin nhắn nếu gửi thành công
// showSender: hiển thị tên người gửi để dùng cho nhóm chat
// time: thời gian gửi tin nhắn
export default function Message(props) {
  let hour = new Date(props.time).getHours();
  let minute = new Date(props.time).getMinutes();
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  return (
    <View
      style={
        props.typeMessage === 0
          ? [styles.messageStyle, styles.sendStyle]
          : [styles.messageStyle, styles.replyStyle]
      }
    >
      <Text style={styles.messageText}>{props.message}</Text>
      {props.typeMessage === 1 && props.showSender === true ? (
        <Text style={styles.sender}>{props.data.sender}</Text>
      ) : null}
      <Text style={styles.time}>{hour + ":" + minute}</Text>
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
    maxWidth: "82%",
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
  sender: {
    fontSize: 10,
    position: "absolute",
    right: 18,
    top: 5,
  },
  checkMessage: {
    position: "absolute",
    right: 1,
    bottom: 3,
  },
});
