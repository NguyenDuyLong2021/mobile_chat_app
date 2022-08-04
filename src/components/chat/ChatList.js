import { memo, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Message from "./Message";

import {
  getLastMessages,
  getMessages,
  offMessagesChange,
  onMessagesChange,
} from "./ChatServices";
export default memo(function ChatList({ userName, roomID }) {
  const [datas, setData] = useState([]);
  const dateRender = [];
  const flatList = useRef(null);

  useEffect(() => {
    let tempData = [];
    let firstGetData = 0;
    getMessages(roomID).then((data) => {
      tempData = data;
      setData(tempData);
    });

    onMessagesChange(roomID, () => {
      getLastMessages(roomID).then((m) => {
        if (firstGetData !== 0) {
          tempData = [...tempData, m];
          setData(tempData);
        } else {
          firstGetData = 1;
        }
      });
    });
    return offMessagesChange(roomID);
  }, [roomID]);

  const myIncludes = (date) => {
    if (dateRender.length === 0) return false;
    for (let i = 0; i < dateRender.length; i++) {
      const sentTime = new Date(dateRender[i].sent_datetime).toDateString();
      if (date === sentTime) return true;
    }
    return false;
  };

  const checkShowLabelDay = () => {
    datas.forEach((item) => {
      const sentTime = new Date(item.sent_datetime).toDateString();
      if (!myIncludes(sentTime)) {
        dateRender.push(item);
      }
    });
  };
  checkShowLabelDay();
  return (
    <FlatList
      ref={flatList}
      onContentSizeChange={() => flatList.current.scrollToEnd()}
      style={styles.messages}
      data={datas}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        dateRender.includes(item) ? (
          <View>
            <View style={styles.day}>
              <Text>
                {new Date().toDateString() ===
                new Date(item.sent_datetime).toDateString()
                  ? "Today"
                  : new Date(item.sent_datetime).toDateString()}
              </Text>
            </View>
            <Message
              data={item}
              typeMessage={item.sender === userName ? 0 : 1}
              message={item.message}
              checkMessage={true}
              showSender={true}
              time={item.sent_datetime}
            />
          </View>
        ) : (
          <Message
            data={item}
            typeMessage={item.sender === userName ? 0 : 1}
            message={item.message}
            checkMessage={true}
            showSender={true}
            time={item.sent_datetime}
          />
        )
      }
    />
  );
});
const styles = StyleSheet.create({
  messages: {
    flexGrow: 9,
  },
  day: {
    marginTop: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#F4F6F9",
    alignSelf: "center",
  },
});
