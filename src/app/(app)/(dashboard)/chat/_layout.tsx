import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useAppSelector } from "@/store/hook";

export default function ChatLayout() {
  const { selectedChannel } = useAppSelector((store) => store.channel);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          navigationBarHidden: true,
          title: selectedChannel?.channelname,
        }}
      />
    </Stack>
  );
}
