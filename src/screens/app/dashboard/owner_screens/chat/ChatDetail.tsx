import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import MessageBox from "@/components/MessageBox";
import { useAppSelector } from "@/store/hook";
import { chatActions } from "@/store/reducers/chatReducer";
import Socket from "@/lib/socket";
import Container from "@/components/Container";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, IconButton, MD3Colors } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { ChatFormSchema } from "@/types/form";
import ProfileInput from "@/components/ProfileInput";

const ChatDetailScreen = () => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChatFormSchema>();

  const { selectedChannel } = useAppSelector((store) => store.channel);
  const { user } = useAppSelector((store) => store.user);
  const { chat } = useAppSelector((store) => store.chat);

  const flatListRef = useRef<FlatList | null>(null);

  const currentChat = useMemo(() => {
    return chat.find((chat) => {
      return chat.channelID === selectedChannel?.channelID;
    });
  }, [chat, selectedChannel]);

  const onSubmit = async (data: ChatFormSchema) => {
    const { message } = data;

    if (message === "") return;

    selectedChannel?.channelID &&
      Socket.emit("message", {
        userID: user?._id,
        channelID: selectedChannel?.channelID,
        message: message,
      });

    reset();
  };

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef.current === null) return;
      flatListRef.current.scrollToEnd();
    }, 100);
  }, [currentChat, flatListRef]);

  useEffect(() => {
    Socket.on(`${selectedChannel?.channelID}_message`, async (data) => {
      await dispatch(
        chatActions.updateChat({
          channelID: selectedChannel?.channelID,
          chat: data.chatData,
        })
      );

      setTimeout(() => {
        if (flatListRef.current === null) return;
        flatListRef.current.scrollToEnd();
      }, 100);
    });

    return () => {
      Socket.off(`${selectedChannel?.channelID}_message`);
    };
  }, []);

  return (
    <SafeAreaView className="h-full w-full">
      <View className="flex-1">
        {currentChat?.chat && currentChat?.chat[0] ? (
          <FlatList
            data={currentChat?.chat}
            renderItem={({ item }) => <MessageBox item={item} user={user} />}
            keyExtractor={(_, index) => index.toString()}
            ref={flatListRef}
          />
        ) : (
          ""
        )}
      </View>
      <View className="flex-row justify-start items-center w-full py-2 px-2 space-x-2">
        <View className="flex-1">
          <Controller
            name="message"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <ProfileInput
                  type="textarea"
                  value={value}
                  placeholder="Nachricht..."
                  onChange={onChange}
                  numberOfLines={1}
                  contentStyle={{
                    paddingTop: 16,
                  }}
                />
              </View>
            )}
          />
        </View>
        <IconButton
          className="mt-2"
          icon="send"
          size={20}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          background={""}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
