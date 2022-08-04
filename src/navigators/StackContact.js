import React from "react";
import Contact from "../components/Contact";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function StackContact(props) {
  return (
    <Stack.Navigator screenOptions={{contentStyle:{marginTop: props.heightStatusBar}}} >
      <Stack.Screen options={{ headerShown: false}} name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
