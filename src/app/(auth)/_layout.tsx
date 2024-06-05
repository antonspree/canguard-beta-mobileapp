import React from "react";
import { Stack } from "expo-router";

const AuthLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="register" />
      <Stack.Screen name="resetpass" />
      <Stack.Screen name="forgot" />
      <Stack.Screen name="joinclub" />
    </Stack>
  );
};

export default AuthLayout;
