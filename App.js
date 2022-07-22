import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import BottomNav from "./src/navigators/BottomNav";
import StackAuth from "./src/navigators/StackAuth";
import {available } from "./src/themes/_availables";

export default function App() {
  const [login, setLogin] = useState(true);
  return (
    <NavigationContainer theme={{colors: available.color.white}}>
      {login ? <BottomNav /> : <StackAuth />}
    </NavigationContainer>
  );
}
