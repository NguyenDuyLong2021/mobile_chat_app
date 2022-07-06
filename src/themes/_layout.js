import { StyleSheet } from "react-native";
import { availabels } from "./_availables";
export const layouts = StyleSheet.create({
  container: {
    backgroundColor: availabels.color.white,
    flex: 1,
    justifyContent: "center",
  },
  text_center:{
    textAlign: "center",
    fontSize: availabels.fs_0,
  },
  text_right:{
    textAlign: "right"
  },
  text_left:{
    textAlign: "left"
  }
});
