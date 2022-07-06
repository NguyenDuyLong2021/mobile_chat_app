import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import BottomNav from "./src/navigators/BottomNav";
import StackAuth from "./src/navigators/StackAuth";
import { availabels } from "./src/themes/_availables";

export default function App() {
  const [login, setLogin] = useState(true);
  return (
    <NavigationContainer theme={{colors: availabels.color.white}}>
      {login ? <BottomNav /> : <StackAuth />}
    </NavigationContainer>
  );
}
