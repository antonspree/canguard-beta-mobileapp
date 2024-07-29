import React from "react";
import { MaterialBottomTabs } from "@/layouts/MaterialBottomTabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

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
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon(props) {
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
          tabBarIcon(props) {
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
        name="club/index"
        options={{
          tabBarLabel: "Club",
          tabBarIcon(props) {
            return <Entypo name="home" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: "Profil",
          tabBarIcon(props) {
            return <Ionicons name="person" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="community"
        options={{
          tabBarLabel: "Community",
          tabBarIcon(props) {
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
    </MaterialBottomTabs>
  );
}
