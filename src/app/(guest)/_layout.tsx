import { useAppSelector } from "@/store/hook";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function GuestLayout() {
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Redirect href={"/(app)"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
