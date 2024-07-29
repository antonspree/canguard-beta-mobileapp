import React from "react";
import { MaterialBottomTabs } from "@/layouts/MaterialBottomTabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function AppLayout() {
  return (
    <MaterialBottomTabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={
        {
          // API Reference: https://reactnavigation.org/docs/material-bottom-tab-navigator#options
        }
      }
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
                name={
                  props.focused ? "alpha-a-circle" : "alpha-a-circle-outline"
                }
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="search"
        options={{
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={
                  props.focused ? "alpha-b-circle" : "alpha-b-circle-outline"
                }
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="create"
        options={{
          tabBarLabel: "Home",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "plus-circle" : "plus-outline"}
              />
            );
          },
        }}
      />
    </MaterialBottomTabs>
  );
}
