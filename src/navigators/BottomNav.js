import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackMain from "./StackMain";
import { availabels } from "../themes/_availables";
import { Image, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: availabels.color.white,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={style.icon_tab}
              source={require("../assets/imgs/message.png")}
            />
          ),
          tabBarBadgeStyle: {
            color: availabels.color.white,
            backgroundColor: availabels.color.primary,
          },
          // tabBarActiveTintColor: availabels.color.primary,
          title:"Home"
        }}
        
        name="StackMain"
        component={StackMain}
      />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  icon_tab: {
    width: 40,
    height: 40,
  },
});
