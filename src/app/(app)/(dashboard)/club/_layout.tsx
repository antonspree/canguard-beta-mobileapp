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
    </Stack>
  );
}
