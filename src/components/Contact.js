import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ref,
  set,
  get,
  getDatabase,
  query,
  onValue,
  off,
  limitToLast,
  orderByChild,
  orderByKey,
  equalTo,
  orderByPriority,
  orderByValue,
} from "firebase/database";
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
import app from "./firebase";

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
const database = getDatabase(app);
const Contact = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [listContact, setListContact] = useState(null);
  // get list contact by id user
  const getListContact = async (idUser) => {
    const myQuery = query(
      ref(database, "contact"),
      orderByChild("idUser"),
      equalTo(idUser)
    );
    let listResult = [];
    return await get(myQuery)
      .then((data) => {
        data.forEach((item) => {
          listResult.push(item);
        });
        return listResult;
      })
      .catch((err) => console.log("lõi ròi", err));
  };

  useEffect(async () => {
    await AsyncStorage.getItem("USER").then((user) => {
      const data = JSON.parse(user);
      getListContact(data.idUser).then((result) => {
        setUser(user);
        setListContact(result);
      });
    });
  }, []);
  
  return (
    <Container>
      <UIHeader title={"Messenger"} />
      <FlatList
        data={listContact}
        keyExtractor={(item) => item.contactID}
        renderItem={({item}) => (
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
                <UserImg source={item.photoURL} />
              </UserImgWrapper>
              {console.log("item", item)}
              <TextSection>
                <UserInfoText>
                  <UserName>{item.displayName}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
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
