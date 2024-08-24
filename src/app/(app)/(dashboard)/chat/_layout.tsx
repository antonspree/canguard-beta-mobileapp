import * as React from "react";
import { Stack, router } from "expo-router";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { channelActions } from "@/store/reducers/channelReducer";
import Text from "@/elements/Text";
import { useDispatch } from "react-redux";
import { appActions } from "@/store/reducers/appReducer";

const ChatHeader = () => {
  const dispatch = useDispatch();

  const { visibleDrawerMenu } = useAppSelector((store) => store.app);

  const toggleDrawerMenu = () => {
    dispatch(appActions.setVisibleDrawerMenu(!visibleDrawerMenu));
  };

  return (
    <View className="flex-row items-center justify-between h-[74px] border-b border-[#EAEAEA] px-4">
      <IconButton
        icon="account"
        mode="contained"
        size={12}
        className="bg-[#EFEFEF]"
        iconColor="#5C5C5C"
        onPress={toggleDrawerMenu}
      />
      <Text variant="titleMedium">Chat</Text>
      <View className="w-10"></View>
    </View>
  );
};

const ChatDetailHeader = ({ title }: { title?: string }) => {
  const dispatch = useAppDispatch();
  const onHandleBack = () => {
    router.back();
    dispatch(channelActions.setSelectedChannel(null));
  };
  return (
    <View className="flex-row items-center justify-between h-[74px] border-b border-[#EAEAEA] px-4">
      <IconButton
        icon="chevron-left"
        mode="contained"
        size={12}
        className="bg-[#EFEFEF]"
        iconColor="#5C5C5C"
        onPress={onHandleBack}
      />
      <Text variant="titleMedium">{title}</Text>
      <View className="w-6 h-6"></View>
    </View>
  );
};

export default function ChatLayout() {
  const { selectedChannel } = useAppSelector((store) => store.channel);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          header: ChatHeader,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          navigationBarHidden: true,
          title: selectedChannel?.channelname,
          header: () => (
            <ChatDetailHeader title={selectedChannel?.channelname} />
          ),
        }}
      />
    </Stack>
  );
}
