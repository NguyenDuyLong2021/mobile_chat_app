import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button} from 'react-native'
import { available } from '../themes/_availables'
import avt from '../assets/imgs/avt3.jpg'
import { FontAwesome } from "@expo/vector-icons";
import {get} from "firebase"
// import Login from './Login';

export default function Profile(props) {

  return (
    <View style={[{marginTop: available.heightStatusBar}]}>
      <View style={styles.header_style}>
        <FontAwesome style={{ fontSize: 18, color: 'white'}} name="arrow-left" size={18} color="black"/>
        <Text style={styles.tiltle_header}>Profile</Text>
      </View>
      <View style={styles.div_1}>
        <Image source={avt} style={styles.avatar}></Image>
        <Text style={styles.name}>Nguyen Thanh Tot</Text>
      </View>
      <View style={styles.border_div}>
        <Text style={styles.tiltle}>Name</Text>
        <TextInput value='Nguyen Thanh Tot' style={styles.input}/>
      </View>
      <View style={styles.border_div}>
        <Text style={styles.tiltle}>Email</Text>
        <TextInput value='thanhtot@gmail.com' style={styles.input}/>
      </View>
      <View style={styles.border_div}>
        <Text style={styles.tiltle}>Phone Number</Text>
        <TextInput value='0123456789' style={styles.input}/>
      </View>
      <Button title='dsdasd' style={styles.btn_logout} onPress={logOut}>
        <FontAwesome style={{ fontSize: 18, color: 'white'}} name="sign-out" size={18} color="black"/>
        <Text style={styles.logOutTxt}>Log out</Text>
      </Button>
      

    </View>
  )
}



// const auth = getAuth();

const logOut = () => {
  // signOut(auth).then(() => {
  //   // Sign-out successful.
  //   // return Login;
    
  // }).catch((error) => {
  //   // An error happened.
  //   console.log('Err', error);
  //   return;
  // });
}



const styles = StyleSheet.create({
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
  btn_logout:{
    flexDirection: 'row',
    backgroundColor: '#228b22',
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
      },
  logOutTxt:{
    color: 'white',
    fontWeight: 'bold', 
    fontSize: 18,
    marginLeft: 10
  }
  });


