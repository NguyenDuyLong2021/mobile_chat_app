import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from "../components/Intro";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const Stack = createNativeStackNavigator();

export default function StackAuth() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Intro" component={Intro} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
