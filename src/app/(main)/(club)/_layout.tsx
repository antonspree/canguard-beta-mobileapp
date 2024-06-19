import React from "react";
import { Stack } from "expo-router";

const HomeLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default HomeLayout;
