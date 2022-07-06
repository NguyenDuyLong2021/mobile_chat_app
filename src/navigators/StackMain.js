import React from "react";
import Home from "../components/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function StackMain() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }}name="Home" component={Home} />
    </Stack.Navigator>
  );
}
