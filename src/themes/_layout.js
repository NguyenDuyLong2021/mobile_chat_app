import { StyleSheet } from "react-native";
import { available as available } from "./_availables";
export const layouts = StyleSheet.create({
  container: {
    backgroundColor: available.color.white,
    flex: 1,
    justifyContent: "center",
  },
  text_center:{
    textAlign: "center",
    fontSize: available.fs_0,
  },
  text_right:{
    textAlign: "right"
  },
  text_left:{
    textAlign: "left"
  }
});
