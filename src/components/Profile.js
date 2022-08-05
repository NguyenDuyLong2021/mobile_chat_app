import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, AsyncStorage} from 'react-native'
import { available } from '../themes/_availables'
import avt from '../assets/imgs/avt3.jpg'
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, updateProfile, updatePhoneNumber, AuthCredential } from 'firebase/auth';
// import {ref,set,get,getDatabase,query,onValue,off,limitToLast,orderByChild,} from "firebase/database";
import AuthContext from '../../context';
import { async } from '@firebase/util';
// import { async } from '@firebase/util';
 
export default function Profile({navigation}) {

  const auth = getAuth()

  const { signOut } = React.useContext(AuthContext);
  const logOut = () => {
    signOut()
      };

  //  const [imgURL, setImgURL] = useState('')
  //  const [textName, setTextName] = useState('')
  //  const [textEmail, setTextEmail] = useState('')
  //  const [textPhone, setTextPhone] = useState('')
   const [user, setUser]= useState(undefined)

   const goBack = () => {
    navigation.navigate("Contact");
  };

  const updateClick =() => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: user.providerData[0].displayName, 
      photoURL: user.providerData[0].photoURL,
    }).then(() => {
      console.log('Cập nhật thành công', result);
      saveData(user);
    }).catch((error) => {
    })
    };

  //load user khi mà chuyển sang màn hình profile
  useEffect(()=>{
  AsyncStorage.getItem('USER').then(storage => {
      setUser(JSON.parse(storage))
    }).catch(e => console.warn(e))
  }, [])

  //handle change email input
  const handleEmail=(value)=>{
    const newArray= user.providerData
    newArray[0].email=value
  setUser({...user, providerData: newArray})
  }
  const handlePhone=(value)=>{
    const newArray= user.providerData
    newArray[0].phoneNumber= value
  setUser({...user, providerData: newArray})
  }
  const handleName=(value)=>{
    const newArray= user.providerData
    newArray[0].displayName=value
  setUser({...user, providerData: newArray})
  }

  const saveData = (user) => {
    try {
       AsyncStorage.setItem("USER", JSON.stringify(user))
    } catch (error) {
      console.log("lõi mẹ r", error);
    }
  };

  return (
    <ScrollView>
      <View style={[{marginTop: available.heightStatusBar}]}>
        <View style= {styles.boxProfile}>
          <View style={styles.header_style}>
            <TouchableOpacity activeOpacity={0.2} onPress={goBack} style={{padding: 10}}>
              <FontAwesome style={{ fontSize: 20, color: 'white'}} name="arrow-left" color="black"/>
            </TouchableOpacity>
            <Text style={styles.tiltle_header}>Profile</Text>
          </View>
          <View style={styles.div_1}>
              <Image source={avt} style={styles.avatar}></Image>
              <Text style={styles.name}>{user===undefined? null: user.providerData[0].displayName}</Text>
            </View>
          <View style={[styles.in4_box, styles.shadowProp]}>
          <View style={styles.border_div}>
              <Text style={styles.tiltle}>Email</Text>
              <TextInput
              editable =  {false}
               placeholder="Enter your email!"
               value={user===undefined? null: user.providerData[0].email}
               onChangeText={(newValue)=> handleEmail(newValue)} style={styles.input}/>
            </View>
            <View style={styles.border_div}>
              <Text style={styles.tiltle}>Name</Text>
              <TextInput 
              placeholder="Enter your name!"
              value={user===undefined? null: user.providerData[0].displayName} 
              onChangeText={(newValue)=> handleName(newValue)} style={styles.input}/>
            </View>
            <View style={styles.border_div}>
              <Text style={styles.tiltle}>Phone Number</Text>
              <TextInput 
              placeholder="Enter your phone number"
              value={user===undefined? null: user.providerData[0].phoneNumber}
              onChangeText={(newValue)=> handlePhone(newValue)} style={styles.input}/>
            </View>
            <View style={[styles.container_btn_update, styles.shadowProp]}>
              <TouchableOpacity style={styles.button_btn_update} onPress={updateClick}>
                <Text style={[styles.fs_btn, {color: '#32CD32'}]}>UPDATE</Text>
                <FontAwesome style={{ fontSize: 18, color: '#32CD32', marginLeft: 10}} name="edit" size={18} color="black"/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container_btn_logout}>
            <TouchableOpacity style={styles.button_btn_logout} onPress={logOut}>
              <Text style={styles.fs_btn}>LOG OUT</Text>
              <FontAwesome style={{ fontSize: 18, color: 'white', marginLeft: 10}} name="sign-out" size={18} color="black"/>
            </TouchableOpacity>
          </View>
        </View>
      
      </View>
    </ScrollView>
  )
}

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  boxProfile:{
    height: ScreenHeight
  },
  in4_box:{
    padding: 10,
    paddingBottom: 35,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 5
  },
  header_style:{
    backgroundColor: '#228b22',
    height:50,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center"
  },
  tiltle_header:{
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white'
  },
  div_1:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar:{
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 20,
  },
  name:{
    fontSize:20,
    marginTop:10,
    fontWeight: 'bold'

  },
  border_div:{
    marginTop: 20,
    height: 60,
    marginRight: 20,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#a9a9a9',
    justifyContent: 'center'
  },
  tiltle:{
    fontWeight: 'bold'
  },
  input:{
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderWidth: 0,
  },
  container_btn_update: {
    marginTop: 30,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button_btn_update: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    paddingVertical:10,
    borderRadius: 10,
  },
  container_btn_logout: {
    marginTop: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button_btn_logout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#228b22",
    paddingVertical:10,
    borderRadius: 10,
  },
  fs_btn: {
    fontSize: 13,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  shadowProp: {
    elevation: 5,
    shadowColor: '#808080',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  });


