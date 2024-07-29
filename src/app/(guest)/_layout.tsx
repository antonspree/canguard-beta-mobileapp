import { Stack } from "expo-router";
import React from "react";

export default function GuestLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
