import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { availabels } from "../../themes/_availables";
import { layouts } from "../../themes/_layout";

export default function ButtonEmpty(props) {
  return (
    <TouchableOpacity style={style.buttonSolid} onPress={() => props.navigation.navigate(props.toScreen)}>
      <Text style={[layouts.text_center, style.text]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  buttonSolid: {
    width: availabels.width - 30,
    height: null,
    padding: 10,
    borderColor: availabels.color.primary,
    borderRadius: availabels.border_radius.r1,
    marginTop: 10,
    marginBottom: 10,
  },
  text:{
    color: availabels.color.primary,
    fontWeight: availabels.fw_1,
    fontSize: availabels.fs_1
  }
});
