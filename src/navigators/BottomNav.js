import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackContact from "./StackContact";
import Chat from "../components/Chat";
import Profile from "../components/Profile";
import Contact from "../components/Contact";

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
          marginTop: 200,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={style.icon_tab}
              source={require("../assets/imgs/contact2.png")}
            />
          ),
          tabBarBadgeStyle: {
            color: availabels.color.white,
            backgroundColor: availabels.color.primary,
          },
          // tabBarActiveTintColor: availabels.color.primary,
          title: "Contact",
        }}
        name="Contact"
        children={() => (
          <StackContact heightStatusBar={availabels.heightStatusBar} />
        )}
      />
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
          title: "Chat",
        }}
        name="Chat"
       component={Chat}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={style.icon_tab}
              source={require("../assets/imgs/profile.png")}
            />
          ),
          tabBarBadgeStyle: {
            color: availabels.color.white,
            backgroundColor: availabels.color.primary,
          },
          // tabBarActiveTintColor: availabels.color.primary,
          title: "Profile",
        }}
        name="Profile"
        component={Profile}
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
