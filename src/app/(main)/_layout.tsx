import React from "react";
import { Stack } from "expo-router";

const MainLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  );
};
export default MainLayout;
