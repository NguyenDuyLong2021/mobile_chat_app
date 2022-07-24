import { Dimensions, StatusBar } from "react-native";
export const available = {
 
  color: {
    primary: "#24A60A",
    white: "#FFFFFF",
    grey: "#595959",
    sub:"#00C956"
  },
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  heightStatusBar: StatusBar.currentHeight,
  //border_radius
  border_radius: {
    r1: 15,
  },
  //font weight
  fw_1: "700",
  fw_2: "800",
  //font size
  fs_0: 16,
  fs_1: 17,
};
