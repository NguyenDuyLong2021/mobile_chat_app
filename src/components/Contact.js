import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ref,
  get,
  getDatabase,
  query,
  orderByChild,
  equalTo,
  set,
  onValue,
} from "firebase/database";
import app from "./firebase";
import { AntDesign } from "@expo/vector-icons";

const database = getDatabase(app);
const Contact = ({ navigation }) => {
  const [listContact, setListContact] = useState([]);
  const [contactName, setContactName] = useState("");
  // get list contact by id user
  const getListContact = async (idUser) => {
    const myQuery = query(
      ref(database, "contacts"),
      orderByChild("idUser"),
      equalTo(idUser)
    );
    let listResult = [];
    return await get(myQuery)
      .then((data) => {
        data.forEach((item) => {
          listResult.push(item.val());
        });
        return listResult;
      })
      .catch((err) => console.log("lõi ròi", err));
  };
  useEffect(() => {
    let start = 0;
    let list = [];
    const user = login();
    getListContact(user.idUser).then((result) => {
      setListContact(result);
      list = result;
    });
    return onValue(ref(database, "numOfContacts"), () => {
      getLastContact(user.idUser).then((value) => {
        if (start === 0) {
          start = 1;
        } else {
          if (
            value !== null &&
            value.idUser == login().idUser
            // !checkExist(list, value.idUser)
          ) {
            list = [...list, value];
            setListContact(list);
          }
        }
      });
    });
  }, []);
  const getLastContact = async (userID) => {
    const myQuery = query(
      ref(database, "contacts"),
      orderByChild("idUser"),
      equalTo(userID)
    );
    let contactDatas = null;
    return await get(myQuery, (data) => {
      return data;
    }).then((data) => {
      contactDatas = null;
      let tempTime = 0;
      if (data.val() !== null) {
        Object.values(data.val()).forEach((value) => {
          if (value.contactDT !== undefined) {
            if (value.contactDT > tempTime) {
              contactDatas = value;
              tempTime = value.contactDT;
            }
          }
        });
      }
      return contactDatas;
    });
  };
  const checkExist = (arr, id) => {
    if (id !== undefined) {
      const result = arr.find((value) => value.idUser === id);
      if (result === undefined) return false;
      return result === null ? false : true;
    }
  };
  const addContact = async () => {
    const user = login();
    const myQuery = query(
      ref(database, "users"),
      orderByChild("displayName"),
      equalTo(contactName)
    );
    let userExist = await get(myQuery);
    if (userExist.val() === null) {
      Alert.alert("Notification", "Không tìm thấy người dùng", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else {
      const checkAdded = listContact.find(
        (value) => value.displayName === contactName
      );
      if (!checkAdded) {
        userExist = userExist.val()[Object.keys(userExist.val())[0]];
        const roomID = await createRoom();
        const idContact = (await getCountContacts()) + 1;
        let contact = {
          contactID: idContact,
          idUser: user.idUser,
          contactorID: userExist.idUser,
          photoURL: "https://i.pravatar.cc/300",
          displayName: userExist.displayName,
          lastMessage: "",
          roomID: roomID,
          typeContact: "userContact",
          contactDT: new Date().getTime(),
        };
        const myQuery = ref(database, "contacts/contact" + idContact);
        increaseContact();
        await set(myQuery, contact);
        // setListContact([...listContact, contact]);
        const idContact1 = (await getCountContacts()) + 1;
        const myQuery1 = ref(database, "contacts/contact" + idContact1);
        contact.contactID = idContact1;
        contact.idUser = userExist.idUser;
        contact.contactorID = user.idUser;
        contact.displayName = user.providerData[0].displayName;
        contact.contactDT = new Date().getTime();

        await set(myQuery1, contact);
      } else {
        Alert.alert("Notification", "Liên hệ này đã có sẵn", [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ]);
      }
    }
  };
  // Lấy tổng số tin nhắn trong numOfMessages
  const getCountContacts = async () => {
    const myQuery = query(ref(database, "numOfContacts"));
    const value = await get(myQuery);
    return value.val();
  };

  const getCountRooms = async () => {
    const myQuery = query(ref(database, "numOfRooms"));
    const value = await get(myQuery);
    return value.val();
  };

  const createRoom = async () => {
    const roomID = (await getCountRooms()) + 1;
    const room = {
      idRoom: roomID,
      totalMess: 0,
    };
    const myQuery = ref(database, "rooms/" + roomID);
    await set(myQuery, room);
    increaseRoom();
    return roomID;
  };
  // tăng số tin nhắn trong 1 phòng chat lên 1
  const increaseContact = async () => {
    const myQuery = ref(database, "numOfContacts");
    const value = await get(myQuery);
    await set(myQuery, value.val() + 1);
  };

  const increaseRoom = async () => {
    const myQuery = ref(database, "numOfRooms");
    const value = await get(myQuery);
    await set(myQuery, value.val() + 1);
  };

  const login = () => {
    return {
      idUser: "wgFC5F7k1YWzRgex5pjhYKNJDd62",
      providerData: [
        {
          displayName: "Nguyễn Dũy Long",
          email: "ndlong28@gmail.com",
          phoneNumber: null,
          photoURL: null,
          providerId: "password",
          uid: "ndlong28@gmail.com",
        },
      ],
      stsTokenManager: {
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2M2E3Y2E0M2MzYzc2MDM2NzRlZGE0YmU5NzcyNWI3M2QwZGMwMWYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmd1eeG7hW4gRMWpeSBMb25nIiwicGljdHVyZSI6IiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGF0LWFwcC03N2VhNiIsImF1ZCI6ImNoYXQtYXBwLTc3ZWE2IiwiYXV0aF90aW1lIjoxNjU5NzE1NzYzLCJ1c2VyX2lkIjoid2dGQzVGN2sxWVd6UmdleDVwamhZS05KRGQ2MiIsInN1YiI6IndnRkM1RjdrMVlXelJnZXg1cGpoWUtOSkRkNjIiLCJpYXQiOjE2NTk3MTU3NjMsImV4cCI6MTY1OTcxOTM2MywiZW1haWwiOiJuZGxvbmcyOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmRsb25nMjhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Ko9IFJ4znPAUQpQ3quHX-RgjoBp3I88KoYTS0WIWw4e-gsEVta4V9wYX0wYautMiqlCHMOEcQOr1_rdlKI5LiB93kRvRvYAa9d4J4e4c2t1ZRYUA64dTTHvKjLklzw53nz1j-_dgwPVy0WP3I5wXcci2Y6TMhB-j1PPAIBkIPDNUyT7Ymy0ZT1p-H33l2atspKBkwiq6KRUAHQEISCwwPAg4cdJ9yh6_ppXHxrwvuHkvFsZikMS3oYrw24Li1WekwTJuG5k_I87PXFIWFs3xJhH4WfiPhoVFlME5F9Xj99x88vrW6Mrxeg54f6N4FGQGx7h3qe099CMor6yPchEGgQ",
        expirationTime: 1659719363532,
        refreshToken:
          "AOEOula06Wyfn5gvjDBDeZoKOtSlZkmQGQlDSvQhpxdEfpgT1iWLEoA1dtyOkhLhJ-BBApg59TlWWoa7BMvgVY7ZORGKbAP_aGcPzv12c1Jgj4j2rN0cDz4jr-w235u4vPkS2VtmunDx8PxsBrFYsxf-bVoLmE2MRkwCLSqKMw67na0pL0awD4t6DRGAJycfuVJyzNsg7QnF2_k6kHU-5zYHl6lzHCDsDW0JD9w5wMvNJMyfL_terxE",
      },
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Simple App chat</Text>
      </View>
      <View style={styles.contactBtns}>
        <TextInput
          value={contactName}
          onChangeText={(value) => setContactName(value)}
          style={styles.searchInput}
          placeholder={"Nhập tên cần thêm liên hệ"}
        />
        <TouchableOpacity style={styles.addContact} onPress={addContact}>
          <AntDesign
            style={styles.addContactText}
            name="adduser"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addContact}>
          <AntDesign
            style={styles.addContactText}
            name="addusergroup"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContact}
        data={listContact}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Chat", {
                userName: item.displayName,
                roomID: item.roomID,
                avatar: item.photoURL,
                contactID: item.contactID,
              })
            }
          >
            <Image style={styles.avatar} source={{ uri: item.photoURL }} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.displayName}</Text>
              <Text style={styles.previewMessage}>{item.lastMessage}</Text>
              <Text style={styles.postTime}>4 min ago</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Contact;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    marginTop: 20,
    width: 358,
  },
  header: {
    backgroundColor: "#E1E1E1E1",
    height: 60,
    width: 358,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00C956",
  },
  listContact: {
    flexGrow: 1,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: "center",
  },
  userInfo: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  previewMessage: {
    marginTop: 5,
    marginBottom: "4%",
    width: 280,
  },
  postTime: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#ccc",
  },
  addContact: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: "50%",
    padding: 10,
    backgroundColor: "#ccc",
  },
  addContactText: {
    fontSize: 30,
  },
  contactBtns: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: 200,
    height: 30,
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    textAlign: "center",
    borderRadius: 10,
  },
});
