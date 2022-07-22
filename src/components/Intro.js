import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { layouts } from "../themes/_layout";
import WelcomeImg from "../assets/imgs/Welcome.img";
import {available } from "../themes/_availables";
import ButtonSolid from "./commons_components/ButtonSolid";
import ButtonEmpty from "./commons_components/ButtonEmpty";

export default function Intro({ navigation }) {
  return (
    <View style={layouts.container}>
      <Image
        resizeMode="contain"
        style={style.image}
        source={require("../assets/imgs/LOGO.png")}
      />
      <View style={{ flex: 2 }}>
        <WelcomeImg />
        <Text
          style={[layouts.text_center, { color: available.color.primary }]}
        >
          Join with us to day and let's talk together.
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ButtonSolid navigation={navigation} name="Login" toScreen="Login" />
        <ButtonEmpty navigation={navigation} name="Register" toScreen="SignUp" />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    flex: 1,
    width: available.width,
  },
});
