import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { availabels } from "../../themes/_availables";
import { layouts } from "../../themes/_layout";

export default function ButtonSolid(props) {
  return (
    <TouchableOpacity style={style.buttonSolid}  onPress={() => props.navigation.navigate(props.toScreen)}>
      <Text style={[layouts.text_center, style.text]}>{props.name}</Text>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  buttonSolid: {
    width: availabels.width - 30,
    height: null,
    padding: 10,
    backgroundColor: availabels.color.primary,
    borderRadius: availabels.border_radius.r1,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: availabels.color.white,
    fontWeight: availabels.fw_1,
    fontSize: availabels.fs_1
  },
});
