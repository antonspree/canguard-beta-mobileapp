import React, { useEffect } from "react";
import { MaterialBottomTabs } from "@/layouts/MaterialBottomTabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { usePathname } from "expo-router";

export default function AppLayout() {
  return (
    <MaterialBottomTabs
      safeAreaInsets={{ bottom: 0 }}
      activeColor="#19A873"
      inactiveColor="#C8C8C8"
      barStyle={{
        backgroundColor: "#ffffff",
        borderTopColor: "#EAEAEA",
        borderTopWidth: 1,
      }}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      activeIndicatorStyle={{
        backgroundColor: "transparent",
      }}
    >
      <MaterialBottomTabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name="view-dashboard"
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon(props: any) {
            return (
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="club"
        options={{
          tabBarLabel: "Club",
          tabBarIcon(props: any) {
            return <Entypo name="home" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profil",
          tabBarIcon(props: any) {
            return <Ionicons name="person" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="community"
        options={{
          tabBarLabel: "Community",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "handshake" : "handshake-outline"}
              />
            );
          },
        }}
        redirect
      />
      <MaterialBottomTabs.Screen
        name="setting"
        options={{
          tabBarLabel: "Setting",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "cog" : "cog-outline"}
              />
            );
          },
        }}
        redirect
      />
      <MaterialBottomTabs.Screen
        name="event"
        options={{
          tabBarLabel: "Ereignisse",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "calendar" : "calendar-outline"}
              />
            );
          },
        }}
        redirect
      />
    </MaterialBottomTabs>
  );
}
