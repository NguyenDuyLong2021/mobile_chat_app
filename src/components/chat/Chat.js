import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { availabels } from "../../themes/_availables";
import CustomChatButton from "./CustomChatButton";
("../../themes/_availables");
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Message from "./Message";

export default function Chat({ navigation }) {
  const [message, setMessage] = useState("");
  const [datas, setData] = useState([
    {
      id: 1,
      name: "Luan",
      type: 0,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 2,
      name: "Luan",
      type: 0,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 3,
      name: "Luan",
      type: 1,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 4,
      name: "Luan",
      type: 1,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 5,
      name: "Luan",
      type: 0,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 6,
      name: "Luan",
      type: 1,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 7,
      name: "Luan",
      type: 0,
      to: "Long",
      message:
        "Văn học có thể phân loại thành: hư cấu hoặc phi hư cấu (theo nội dung), và thơ hoặc văn xuôi (theo hình thức))",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 8,
      name: "Luan",
      type: 1,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 9,
      name: "Luan",
      type: 0,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
    {
      id: 10,
      name: "Luan",
      type: 1,
      to: "Long",
      message: "abcde",
      createAt: "2022-07-17 14:56:30",
    },
  ]);
  const checkDay = (day) => (day === 8 ? true : false);
  const sendChat = () => {
    if (message !== "") {
      setData([
        ...datas,
        {
          id: datas[datas.length - 1].id,
          name: "Luan",
          type: 0,
          to: "Long",
          message: message,
          createAt: "",
        },
      ]);
      setMessage("");
    }
  };
  const goBack = () => {
    navigation.navigate("Contact");
  };
  const flatList = React.useRef(null);
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
            source={require("../../assets/imgs/ninja-black.png")}
          />
          <Text style={styles.name}>Kristin Watson</Text>
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
      <FlatList
        ref={flatList}
        onContentSizeChange={() => flatList.current.scrollToEnd()}
        style={styles.messages}
        data={datas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          checkDay(item.id) === true ? (
            <View style={styles.day}>
              <Text>Today</Text>
            </View>
          ) : (
            <Message
              typeMessage={item.type}
              message={item.message}
              checkMessage={true}
              time={"19:57"}
            />
          )
        }
      />
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
  messages: {
    flexGrow: 9,
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
  day: {
    marginTop: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#F4F6F9",
    alignSelf: "center",
  },
});
