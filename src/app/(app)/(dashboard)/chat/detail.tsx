import React from "react";
import { useRouter } from "expo-router";
import ChatDetailScreen from "@/screens/app/dashboard/owner_screens/chat/ChatDetail";

const ChatDetail = () => {
  return <ChatDetailScreen />;
};

ChatDetail.options = {
  tabBarStyle: {
    display: "none",
  },
};

export default ChatDetail;
