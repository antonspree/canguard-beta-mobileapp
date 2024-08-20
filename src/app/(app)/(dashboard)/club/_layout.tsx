import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Club",
        }}
      />
      <Stack.Screen
        name="academy"
        options={{
          title: "Academy",
        }}
      />
      <Stack.Screen
        name="setting"
        options={{
          title: "Club Setting",
        }}
      />
    </Stack>
  );
}
