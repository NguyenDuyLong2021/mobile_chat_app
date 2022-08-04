import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { available } from "../../themes/_availables";
import { layouts } from "../../themes/_layout";

export default function ButtonSolidSubmit(props) {
  // () => props.navigation.navigate(props.toScreen)
  return (
    <TouchableOpacity style={style.buttonSolid}  onPress={props.callback}>
      <Text style={[layouts.text_center, style.text]}>{props.name}</Text>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  buttonSolid: {
    width: available.width - 30,
    height: null,
    padding: 10,
    backgroundColor: available.color.primary,
    borderRadius: available.border_radius.r1,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: available.color.white,
    fontWeight: available.fw_1,
    fontSize: available.fs_1
  },
});
