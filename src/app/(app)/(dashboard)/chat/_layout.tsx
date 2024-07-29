import React, { useEffect } from "react";
import { Stack, router } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="detail"
        options={{
          navigationBarHidden: true,
        }}
      />
    </Stack>
  );
}
