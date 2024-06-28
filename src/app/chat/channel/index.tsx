import { useEffect, useMemo, useRef, useState } from "react";
import { View, FlatList, Text, TextInput, Pressable } from "react-native";
import { useAppSelector } from "@/store/hook";
import DetailContainer from "@/components/DetailContainer";
import MessageBox from "@/components/MessageBox";
import Socket from "@/lib/socket";
import { useDispatch } from "react-redux";
import { chatActions } from "@/store/reducers/chatReducer";

const ChatChannel = () => {
  const dispatch = useDispatch();

  const { selectedChannel } = useAppSelector((store) => store.channel);
  const { user } = useAppSelector((store) => store.user);
  const { chat } = useAppSelector((store) => store.chat);

  const flatListRef = useRef<FlatList | null>(null);
  const [message, setMessage] = useState("");

  const currentChat = useMemo(() => {
    return chat.find((chat) => {
      return chat.channelID === selectedChannel?.channelID;
    });
  }, [chat, selectedChannel]);

  const onSend = async () => {
    if (message === "") return;

    selectedChannel?.channelID &&
      Socket.emit("message", {
        userID: user?._id,
        channelID: selectedChannel?.channelID,
        message: message,
      });

    setMessage("");
  };

  useEffect(() => {
    if (flatListRef.current === null) return;
    setInterval(() => {
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
    });

    return () => {
      Socket.off(`${selectedChannel?.channelID}_message`);
    };
  }, []);

  return (
    <DetailContainer
      title={selectedChannel?.channelname as "UNDEFINED"}
      backLink="/dashboard/messages"
    >
      <View className="flex-1">
        <View className="flex-1 py-4 px-3">
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

        <View className="flex-row justify-center w-full min-h-[100px] bg-white py-8 px-4">
          <TextInput
            className="border p-4 flex-1 mr-3 rounded-3xl"
            onChangeText={(value) => setMessage(value)}
            value={message}
            placeholder="Nachricht"
          />
          <Pressable
            className="px-4 bg-green-700 rounded-3xl items-center justify-center"
            onPress={onSend}
          >
            <View>
              <Text className="text-base text-white">Schicken</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </DetailContainer>
  );
};

export default ChatChannel;
