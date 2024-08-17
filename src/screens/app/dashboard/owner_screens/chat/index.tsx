import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  View,
  Modal,
  useWindowDimensions,
  LogBox,
} from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, Text, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderHtml from "react-native-render-html";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getAllChannels, getChatData } from "@/actions/chat";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { IChannel, channelActions } from "@/store/reducers/channelReducer";
import { IChat, chatActions } from "@/store/reducers/chatReducer";
import Container from "@/components/Container";
import ProfileInput from "@/components/ProfileInput";
import Socket from "@/lib/socket";
import { isEmpty } from "@/lib/function";
import { ChannelFormSchema } from "@/types/form";

LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider:",
  "Warning: TNodeChildrenRenderer:",
  "Warning: MemoizedTNodeRenderer:",
]);

const ChatItem: React.FC<{ item: IChannel }> = ({ item }) => {
  const dispatch = useDispatch();

  // const { width } = useWindowDimensions();

  const { user } = useAppSelector((state) => state.user);
  const { chat } = useAppSelector((state) => state.chat);

  const [loading, setLoading] = useState(false);

  const goChat = async (channel: any) => {
    await dispatch(channelActions.setSelectedChannel(channel));
    router.push("/(app)/(dashboard)/chat/detail");
  };

  const currentChat = useMemo(() => {
    return chat.find((chat: IChat) => {
      return chat.channelID === item.channelID;
    });
  }, [chat, item]);

  useEffect(() => {
    (async () => {
      if (item.channelID) {
        const result = await getChatData(item.channelID);

        if (result?.success) {
          dispatch(
            chatActions.updateChat({
              channelID: item.channelID,
              chat: result?.chatData,
            })
          );
        }
      }
    })();
  }, [item.channelID, dispatch]);

  useEffect(() => {
    Socket.emit("joinChannel", {
      channeID: item.channelID,
    });

    Socket.on("updateChannel", async (data) => {
      data.userID === user?._id && Toast;

      data.userID === user?._id && setLoading(false);

      if (data.success) {
        await dispatch(channelActions.setChannel({ channel: data.channel }));

        await dispatch(
          chatActions.updateChat({
            channelID: item.channelID,
            chat: data.chatData,
          })
        );
      }
    });
  }, []);

  return (
    <Pressable
      className="flex flex-row items-center space-x-3 border-b border-gray-200 px-4 py-2"
      onPress={() => goChat(item)}
    >
      <Text className="text-2xl">#</Text>
      <View>
        <Text variant="titleSmall">{item.channelname}</Text>
        <View className="flex flex-row">
          <View className="w-full">
            <Text variant="bodySmall" className="text-[10px] text-[#8E8E8E]">
              {currentChat?.chat &&
                currentChat?.chat[currentChat?.chat?.length - 1].user.username}
            </Text>
          </View>
          {/* <View className="">
            <RenderHtml
              contentWidth={width}
              source={{
                html:
                  (currentChat?.chat &&
                    currentChat?.chat[currentChat?.chat?.length - 1].chat) ||
                  "",
              }}
            />
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};

const ChatScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { channel } = useAppSelector((state) => state.channel);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ChannelFormSchema>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: ChannelFormSchema) => {
    setLoading(true);

    Socket.emit("createChannel", {
      userID: user?._id,
      ...data,
    });
  };

  useEffect(() => {
    if (user) {
      Socket.on(
        "createChannel",
        async (data: {
          userID: string | undefined;
          msg: any;
          success: any;
          channel: any;
          channelID: string;
        }) => {
          data.userID === user?._id &&
            Toast.show({
              type: "success",
              text1: "Glückwunsch",
              text2: data.msg,
            });

          data.userID === user?._id && setLoading(false);

          if (data.success) {
            data.userID === user?._id && setOpen(false);

            await dispatch(
              channelActions.setChannel({ channel: data.channel })
            );

            await dispatch(channelActions.setSelectedChannel(data));

            data.userID === user?._id &&
              router.push("/(app)/(dashboard)/chat/detail");
          }
        }
      );
    }

    return () => {
      Socket.off("createChannel");
    };
  }, [user, dispatch, router]);

  useEffect(() => {
    (async () => {
      const result = await getAllChannels();

      if (result.success) {
        dispatch(channelActions.setChannel({ channel: result.channel }));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      reset();
    }
  }, [open]);

  return (
    <>
      {!isEmpty(channel) ? (
        <Container>
          <View className="flex-row px-5 mb-4">
            <Button
              mode="outlined"
              onPress={() => setOpen(true)}
              icon={"plus"}
              className="border-[#EAEAEA]"
              style={{
                borderColor: "#EAEAEA",
              }}
              textColor="#000000"
            >
              <Text variant="bodySmall">Chat erstellen</Text>
            </Button>
          </View>
          <View className="px-5">
            {channel.map((item: any, index: number) => {
              return <ChatItem item={item} key={index} />;
            })}
          </View>
        </Container>
      ) : (
        <SafeAreaView
          style={{ flex: 1, padding: 0, margin: 0 }}
          className="flex-1 h-full w-full p-0 m-0 bg-gray-100"
        >
          <View className="flex-1 justify-center items-center">
            <Button
              mode="contained"
              buttonColor="#19A873"
              onPress={() => setOpen(true)}
              className="rounded-md"
            >
              <Text className="font-bold text-center text-base text-white">
                Chat erstellen
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      )}
      <Portal>
        <Dialog
          visible={open}
          onDismiss={() => setOpen(false)}
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <Dialog.Title>
            <Text variant="titleMedium">Erstellen eines Chats</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View>
              <Controller
                name="channelname"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      value={value}
                      label="Título del chat*"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View>
              <Controller
                name="channeldesc"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <ProfileInput
                      type="textarea"
                      value={value}
                      label="Descripción del chat*"
                      onChange={onChange}
                    />
                  </View>
                )}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpen(false)} className="rounded-md">
              <Text variant="bodyMedium" className="font-semibold">
                Abbrechen
              </Text>
            </Button>
            <Button
              mode="contained"
              buttonColor="#19A873"
              onPress={handleSubmit(onSubmit)}
              className="rounded-md"
              contentStyle={{ paddingHorizontal: 16 }}
            >
              <Text variant="bodyMedium" className="font-semibold text-white">
                Erstellen
              </Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        className="border border-red-600"
      >
        
      </Modal> */}
    </>
  );
};

export default ChatScreen;
