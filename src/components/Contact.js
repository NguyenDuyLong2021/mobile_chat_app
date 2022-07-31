import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../assets/styles/chatStyle";
import UIHeader from "./UIHeader";

const ChatData = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/imgs/avt1.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/imgs/avt2.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/imgs/avt3.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selena Paul",
    userImg: require("../assets/imgs/avt4.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/imgs/avt5.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const Contact = ({ navigation }) => {
  return (
    <Container>
      <UIHeader title={"Messenger"} />
      <FlatList
        data={ChatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("Chat", {
                userName: item.userName,
                roomID: item.id,
              })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default Contact;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
