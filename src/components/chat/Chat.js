import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import CustomChatButton from "./CustomChatButton";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { available as availabels } from "../../themes/_availables";
import { chat, offMessagesChange } from "./ChatServices";
import ChatList from "./ChatList";

export default function Chat({ navigation, route }) {
  const [message, setMessage] = useState("");
  const { userName, roomID } = route.params;

  const sendChat = () => {
    if (message !== "") {
      chat(userName, roomID, message);
      setMessage("");
    }
  };
  const goBack = () => {
    navigation.navigate("Contact");
    offMessagesChange(roomID);
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity activeOpacity={0.2} onPress={goBack}>
            <FontAwesome
              style={{ fontSize: 18 }}
              name="arrow-left"
              size={18}
              color="black"
            />
          </TouchableOpacity>
          <Image
            style={styles.avatar}
            source={require("../../assets/imgs/long.jpg")}
          />
          <Text style={styles.name}>contact Name</Text>
        </View>
        <View style={styles.rightHeader}>
          <CustomChatButton
            backgroundColor="#E5E5E5"
            icon={
              <Feather
                name="phone-call"
                size={18}
                color={availabels.color.sub}
              />
            }
          />
          <CustomChatButton
            backgroundColor="#E5E5E5"
            icon={
              <Feather name="video" size={18} color={availabels.color.sub} />
            }
          />
          <CustomChatButton
            backgroundColor="#E5E5E5"
            icon={
              <Entypo
                name="dots-three-vertical"
                size={18}
                color={availabels.color.sub}
              />
            }
          />
        </View>
      </View>
      {/* <ChatList datas={datas} sender={SENDER} /> */}
      <ChatList userName={userName} roomID={roomID} />
      <View style={styles.chatFrame}>
        <TextInput
          placeholder="Type message..."
          style={styles.inputMessage}
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
        <CustomChatButton
          backgroundColor={availabels.color.sub}
          onPress={sendChat}
          icon={
            <FontAwesome
              style={styles.icon}
              name="send-o"
              size={18}
              color="#fff"
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  chatFrame: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  inputMessage: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E5E5E5",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  leftHeader: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightHeader: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 10,
  },
  name: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});
