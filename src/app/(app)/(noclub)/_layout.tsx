import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialBottomTabs } from "@/layouts/MaterialBottomTabs";
import { useTheme } from "@/hooks/useThemeProvider";

export default function AppLayout() {
  const { colors } = useTheme();

  return (
    <MaterialBottomTabs
      safeAreaInsets={{ bottom: 0 }}
      activeColor={colors.bgColor}
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
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "home" : "home-outline"}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarLabel: "Search",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "home-search" : "home-search-outline"}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="create"
        options={{
          tabBarLabel: "Create",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "plus-circle" : "plus"}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "account" : "account-outline"}
              />
            );
          },
        }}
      />
    </MaterialBottomTabs>
  );
}
