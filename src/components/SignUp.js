import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SignUpSVG from "../assets/imgs/SignUp";
import {available } from "../themes/_availables";
import { layouts } from "../themes/_layout";
import { utils } from "../themes/utils";
import ButtonSolid from "./commons_components/ButtonSolid";

export default function SignUp({navigation}) {
  return (
    <View style={layouts.container}>
      <Image
        resizeMode="contain"
        style={utils.logo}
        source={require("../assets/imgs/LOGO.png")}
      />
      <View style={{ flex: 1 }}>
        <SignUpSVG />
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[style.text_input_area, style.ip_pass]}>
          <Image
            resizeMode="center"
            style={style.icon_ip}
            source={require("../assets/imgs/email.png")}
          />
          <TextInput
            selectionColor={available.color.primary}
            placeholder="Enter user name"
            style={style.text_input}
          ></TextInput>
        </View>
        <View style={[style.text_input_area, style.ip_pass]}>
          <Image
            resizeMode="center"
            style={style.icon_ip}
            source={require("../assets/imgs/lock.png")}
          />
          <TextInput
            selectionColor={available.color.primary}
            placeholder="Enter password"
            style={style.text_input}
          ></TextInput>
        </View>
        <View style={[style.text_input_area, style.ip_pass, {marginBottom: 10}]}>
          <Image
            resizeMode="center"
            style={style.icon_ip}
            source={require("../assets/imgs/phone.png")}
          />
          <TextInput
            selectionColor={available.color.primary}
            placeholder="Enter user name"
            style={style.text_input}
          ></TextInput>
        </View>
        <ButtonSolid name="Sign Up" />
      </View>
      <Text style={[layouts.text_center, style.help, style.ip_user]} onPress={()=> navigation.navigate("Login")}>
        You have account{" "}
        <Text style={{ color: available.color.primary }}>Login now</Text>
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  text_ip: {
    width: available.width - 20,
    padding: 10,
    borderWidth: 2,
    borderColor: available.color.primary,
    borderRadius: available.border_radius.r1,
    color: available.color.primary,
    fontWeight: available.fw_1,
    fontSize: available.fs_0,
  },
  lable: {
    marginStart: 10,
    fontSize: available.fs_0,
    color: available.color.grey,
  },
  ip_user: {
    marginBottom: 20,
  },
  ip_pass: {
    marginTop: 20,
  },
  help: {
    fontWeight: available.fw_2,
    fontSize: available.fs_0,
    color: available.color.grey,
  },
  //
  text_input_area: {
    flexDirection: "row",
  },
  icon_ip: {
    width: 40,
    height: 40,
  },
  text_input: {
    width: available.width - 60,
    borderBottomWidth: 1,
    borderBottomColor: available.color.grey,
    color: available.color.primary,
    padding: 10,
  },
});
