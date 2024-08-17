import React from "react";
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="personal"
        options={{ title: "Profil bearbeiten" }}
      />
      <Stack.Screen name="booking" options={{ title: "Buchungen" }} />
      <Stack.Screen name="membership" options={{ title: "Mitgliedschaft" }} />
      <Stack.Screen
        name="notification"
        options={{ title: "Benachrichtigungen" }}
      />
    </Stack>
  );
}
