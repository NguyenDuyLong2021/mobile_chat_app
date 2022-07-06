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
import { availabels } from "../themes/_availables";
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
            selectionColor={availabels.color.primary}
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
            selectionColor={availabels.color.primary}
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
            selectionColor={availabels.color.primary}
            placeholder="Enter user name"
            style={style.text_input}
          ></TextInput>
        </View>
        <ButtonSolid name="Sign Up" />
      </View>
      <Text style={[layouts.text_center, style.help, style.ip_user]} onPress={()=> navigation.navigate("Login")}>
        You have account{" "}
        <Text style={{ color: availabels.color.primary }}>Login now</Text>
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  text_ip: {
    width: availabels.width - 20,
    padding: 10,
    borderWidth: 2,
    borderColor: availabels.color.primary,
    borderRadius: availabels.border_radius.r1,
    color: availabels.color.primary,
    fontWeight: availabels.fw_1,
    fontSize: availabels.fs_0,
  },
  lable: {
    marginStart: 10,
    fontSize: availabels.fs_0,
    color: availabels.color.grey,
  },
  ip_user: {
    marginBottom: 20,
  },
  ip_pass: {
    marginTop: 20,
  },
  help: {
    fontWeight: availabels.fw_2,
    fontSize: availabels.fs_0,
    color: availabels.color.grey,
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
    width: availabels.width - 60,
    borderBottomWidth: 1,
    borderBottomColor: availabels.color.grey,
    color: availabels.color.primary,
    padding: 10,
  },
});
