import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackContact from "./StackContact";
import Profile from "../components/Profile";
import Contact from "../components/Contact";

import { available } from "../themes/_availables";
import { Image, StyleSheet } from "react-native";
import Chat from "../components/chat/Chat";

const Tab = createBottomTabNavigator();
export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: available.color.white,
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
              source={require("../assets/imgs/contact2.png")}
            />
          ),
          tabBarBadgeStyle: {
            color: available.color.white,
            backgroundColor: available.color.primary,
          },

          // tabBarActiveTintColor: availabels.color.primary,
          title: "Contact",
        }}
        name="Contact"
        children={() => (
          <StackContact heightStatusBar={available.heightStatusBar} />
        )}
      />
      <Tab.Screen
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={style.icon_tab}
              source={require("../assets/imgs/message.png")}
            />
          ),
          tabBarBadgeStyle: {
            color: available.color.white,
            backgroundColor: available.color.primary,
          },
          // tabBarActiveTintColor: availabels.color.primary,
          title: "Chat",
          tabBarButton: () => null,
          tabBarStyle: {
            display: route.name === "Chat" ? "none" : "flex",
          },
        })}
        name="Chat"
        component={Chat}
      />

      {/* const ChatStack = ({navigation}) ={">"} (
  <Stack.Navigator>
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
); */}

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
            color: available.color.white,
            backgroundColor: available.color.primary,
          },
          tabBarHideOnKeyboard:true,
          // tabBarActiveTintColor: availabels.color.primary,
          title: "Profile",
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
const ChatStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);
const style = StyleSheet.create({
  icon_tab: {
    width: 40,
    height: 40,
  },
});
