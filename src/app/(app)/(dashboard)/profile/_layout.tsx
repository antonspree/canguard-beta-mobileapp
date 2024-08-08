import React from "react";
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="personal"
        options={{ title: "Personal information" }}
      />
    </Stack>
  );
}
