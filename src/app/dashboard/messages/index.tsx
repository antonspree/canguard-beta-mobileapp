import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  Text,
  View,
  Modal,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import RenderHtml from "react-native-render-html";
import Toast from "react-native-toast-message";
import { Plus } from "lucide-react-native";
import { Container, ProfileInput } from "@/components";
import { getAllChannels, getChatData } from "@/actions/chat";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ChannelFormSchema } from "@/types/form";
import Socket from "@/lib/socket";
import { IChannel, channelActions } from "@/store/reducers/channelReducer";
import message from "@/lib/message";
import { chatActions } from "@/store/reducers/chatReducer";

const ChatItem: React.FC<{ item: IChannel }> = ({ item }) => {
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const { user } = useAppSelector((state) => state.user);
  const { chat } = useAppSelector((state) => state.chat);

  const [loading, setLoading] = useState(false);

  const goChat = async (channel: any) => {
    await dispatch(channelActions.setSelectedChannel(channel));
    router.replace("/chat/channel");
  };

  const currentChat = useMemo(() => {
    return chat.find((chat) => {
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
      className="flex flex-row items-center space-x-3 border-b border-gray-100 px-4 py-2"
      onPress={() => goChat(item)}
    >
      <Text className="text-2xl">#</Text>
      <View>
        <Text className="font-semibold">{item.channelname}</Text>
        <View className="flex flex-row">
          <View className="w-full">
            <Text className="text-[10px]">
              {currentChat?.chat &&
                currentChat?.chat[currentChat?.chat?.length - 1].user.username}
            </Text>
          </View>
          <View className="">
            <RenderHtml
              contentWidth={width}
              source={{
                html:
                  (currentChat?.chat &&
                    currentChat?.chat[currentChat?.chat?.length - 1].chat) ||
                  "",
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { channel } = useAppSelector((state) => state.channel);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChannelFormSchema>();

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
          data.userID === user?._id && message({ message: data.msg });

          data.userID === user?._id && setLoading(false);

          if (data.success) {
            data.userID === user?._id && setOpen(false);

            await dispatch(
              channelActions.setChannel({ channel: data.channel })
            );

            await dispatch(channelActions.setSelectedChannel(data));

            data.userID === user?._id && router.push("/chat/channel/");
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

  return (
    <Container>
      <View className="px-5 mb-4">
        <Pressable
          onPress={() => setOpen(true)}
          className="flex flex-row items-center space-x-1 bg-white w-[150px] px-5 py-1 border border-gray-100 rounded-full"
        >
          <Plus color={"#000000"} size={12} />
          <Text className="text-xs">Chat erstellen</Text>
        </Pressable>
      </View>
      <View className="px-5">
        {channel.map((item, index) => {
          return <ChatItem item={item} key={index} />;
        })}
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="flex flex-col">
          <Pressable
            className="w-full h-3/5 bg-black/50"
            onPress={() => setOpen(false)}
          />
          <View className="w-full h-2/5 overflow-hidden flex justify-center items-center py-10 px-10 bg-white">
            <View className="flex flex-col space-y-4 w-full overflow-hidden border border-[#EAEAEA] rounded-md py-10 px-10">
              <Text className="mb-4 text-lg font-semibold">
                Erstellen eines Chats
              </Text>
              <View className="mb-4">
                <Controller
                  name="channelname"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <ProfileInput
                        value={value}
                        placeholder="Título del chat*"
                        onChange={onChange}
                      />
                    </View>
                  )}
                />
              </View>
              <View className="mb-4">
                <Controller
                  name="channeldesc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <ProfileInput
                        value={value}
                        placeholder="Descripción del chat*"
                        onChange={onChange}
                      />
                    </View>
                  )}
                />
              </View>
              <Pressable
                onPress={handleSubmit(onSubmit)}
                className="flex justify-center items-center px-4 py-3 border border-[#EAEAEA] rounded-md bg-[#919191]"
              >
                <Text className="text-white">Erstellen</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Chat;
