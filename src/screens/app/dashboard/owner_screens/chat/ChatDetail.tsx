import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, FlatList, Pressable, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { EmojiKeyboard, EmojiType } from "rn-emoji-keyboard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "@/store/hook";
import { chatActions } from "@/store/reducers/chatReducer";
import MessageBox from "@/components/MessageBox";
import Socket from "@/lib/socket";
import { ChatFormSchema } from "@/types/form";
import InsertLinkModal from "./InsertLinkModal";
import { useTheme } from "@/hooks/useThemeProvider";

const ChatDetailScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChatFormSchema>();

  const { selectedChannel } = useAppSelector((store) => store.channel);
  const { user } = useAppSelector((store) => store.user);
  const { chat } = useAppSelector((store) => store.chat);

  const flatListRef = useRef<ScrollView | null>(null);
  const richText = useRef<any>();

  const [visibleEmoji, setVisibleEmoji] = useState(false);
  const [visibleInserLinkModal, setVisibleInsertLinkModal] = useState(false);

  const currentChat = useMemo(() => {
    return chat.find((chat) => {
      return chat.channelID === selectedChannel?.channelID;
    });
  }, [chat, selectedChannel]);

  const handleOnEmojiSelected = (emojiObject: EmojiType) => {
    richText.current?.insertText(emojiObject.emoji);
  };

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
    richText.current?.setContentHTML("");
  };

  const onInsertLink = useCallback(() => {
    setVisibleInsertLinkModal(true);
  }, []);

  const onInsertLinkHandle = async (link: string) => {
    richText.current?.insertLink("link", link);
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
    <>
      <InsertLinkModal
        visible={visibleInserLinkModal}
        closeModal={() => setVisibleInsertLinkModal(false)}
        onSubmit={onInsertLinkHandle}
      />
      <SafeAreaView className="h-full w-full bg-gray-100">
        <View className="flex-1">
          {currentChat?.chat && currentChat?.chat[0] ? (
            <ScrollView ref={flatListRef}>
              {currentChat?.chat.map((item) => (
                <MessageBox item={item} user={user} />
              ))}
            </ScrollView>
          ) : (
            ""
          )}
        </View>
        <View className="flex-row justify-start items-center w-full py-2 px-2 space-x-2">
          <View className="relative flex-1">
            {visibleEmoji ? (
              <EmojiKeyboard
                onEmojiSelected={handleOnEmojiSelected}
                styles={{
                  container: {
                    position: "absolute",
                    height: 320,
                    bottom: "105%",
                    left: 0,
                    borderRadius: 4,
                  },
                }}
                emojiSize={8}
              />
            ) : null}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "#ffffff",
                borderColor: "transparent",
                height: 52,
                borderRadius: 4,
              }}
            >
              <View>
                <Pressable
                  className={`flex-row justify-center items-center w-[32px] h-[32px] mr-[4px] bg-[${
                    visibleEmoji ? colors.bgColor : "#FFFFFF"
                  }] rounded-[4px]`}
                  onPress={() => setVisibleEmoji((v) => !v)}
                >
                  <MaterialCommunityIcons
                    color={visibleEmoji ? "#FFFFFF" : "#000000"}
                    size={20}
                    name="emoticon-happy-outline"
                  />
                </Pressable>
              </View>
              <RichToolbar
                editor={richText}
                unselectedButtonStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  marginRight: 4,
                }}
                selectedIconTint="#ffffff"
                selectedButtonStyle={{
                  backgroundColor: colors.bgColor,
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  marginRight: 4,
                }}
                iconTint="#312921"
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.setStrikethrough,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.blockquote,
                  actions.code,
                  actions.undo,
                  actions.redo,
                ]}
                onInsertLink={onInsertLink}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  padding: 0,
                  paddingRight: 16,
                  height: "auto",
                }}
              />
            </ScrollView>
            <Controller
              name="message"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <RichEditor
                  ref={richText}
                  onChange={onChange}
                  placeholder="Schreiben Sie Ihre Nachricht"
                  initialHeight={32}
                  style={{
                    backgroundColor: "#ffffff",
                    maxHeight: 180,
                    overflow: "hidden",
                  }}
                  initialContentHTML=""
                  initialFocus
                  // scrollEnabled
                />
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
    </>
  );
};

export default ChatDetailScreen;
