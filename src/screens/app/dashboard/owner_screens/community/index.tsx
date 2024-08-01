import React from "react";
import {
  Pressable,
  Text,
  View,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect, useRef, useState } from "react";
import { IFeed, feedActions } from "@/store/reducers/feedReducer";
import {
  createFeed,
  getFeed,
  likesFeed,
  removeFeed,
  replyFeed,
} from "@/actions/feed";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Toast from "react-native-toast-message";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CommFeedScreen() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { feed } = useAppSelector((state) => state.feed);

  const [message, setMessage] = useState("");
  const [images, setImages] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);
  const [votes, setVotes] = useState<any>([]);
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const onSend = async () => {
    console.log(message, votes);
    const formData = new FormData();

    formData.append("content", message);
    formData.append("votes", JSON.stringify(votes));
    images.map((item: any) => formData.append("images", item));
    documents.map((item: any) => formData.append("documents", item));

    const result = await createFeed(formData);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: result.msg,
      });
      dispatch(feedActions.setFeed({ feed: result.feed }));

      setImages([]);
      setPreviewImages([]);
      setDocuments([]);
      setVotes([]);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.msg,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getFeed();

      if (result.success) {
        dispatch(feedActions.setFeed({ feed: result.feed }));
      }
    })();
  }, [dispatch]);

  const richText = useRef<any>();
  const handleHead = ({ tintColor }: { tintColor: any }) => (
    <Text style={{ color: tintColor }}>H1</Text>
  );

  return (
    <View className="px-5 py-5">
      <View className="bg-gray-200 rounded-lg p-5 mb-2">
        <KeyboardAvoidingView>
          {/* <RichEditor
            placeholder="Teile deine Gedanken..."
            ref={richText}
            initialContentHTML={message}
            onChange={setMessage}
          /> */}
        </KeyboardAvoidingView>
        {/* <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
          ]}
          iconMap={{ [actions.heading1]: handleHead }}
        /> */}

        <RichToolbar
          editor={richText}
          selectedIconTint="#873c1e"
          iconTint="#312921"
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
        />
        <RichEditor
          ref={richText}
          onChange={richTextHandle}
          placeholder="Message..."
          initialHeight={20}
        />
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row space-x-2">
            <Pressable>
              <MaterialCommunityIcons
                color={"#4C4C4C"}
                size={16}
                name={"plus-circle"}
              />
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons
                color={"#4C4C4C"}
                size={16}
                name={"image"}
              />
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons
                color={"#4C4C4C"}
                size={16}
                name={"face-man-outline"}
              />
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons
                color={"#4C4C4C"}
                size={16}
                name={"chart-bar"}
              />
            </Pressable>
          </View>
          <Pressable onPress={onSend}>
            <MaterialCommunityIcons color={"#4C4C4C"} size={16} name={"send"} />
          </Pressable>
        </View>
      </View>
      {feed && (
        <View>
          {feed.map((item, i) => (
            <CommFeedItem key={i} {...item} />
          ))}
        </View>
      )}
    </View>
  );
}

export function CommFeedItem({
  _id,
  content,
  createdAt,
  date,
  detail,
  documents,
  images,
  likes,
  updatedAt,
  user,
  votes,
}: IFeed) {
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const richText = useRef<any>();
  const [message, setMessage] = useState("");

  const [replyMessage, setReplyMessage] = useState("");
  const [replyImages, setReplyImages] = useState<any>([]);
  const [replyDocuments, setReplyDocuments] = useState<any>([]);
  const [replyPreviewImages, setReplyPreviewImages] = useState<any>([]);
  const handleHead = ({ tintColor }: { tintColor: any }) => (
    <Text style={{ color: tintColor }}>H1</Text>
  );

  const handleRemoveFeed = async () => {
    const result = await removeFeed({ feedID: _id });

    if (result.success) {
      dispatch(feedActions.setFeed({ feed: result.feed }));

      Toast.show({
        type: "success",
        text1: "Success",
        text2: result.msg,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.msg,
      });
    }
  };

  const handleLikesFeed = async () => {
    const result = await likesFeed({ feedID: _id });

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: _id,
          feed: result.feed,
        })
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: result.msg,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.msg,
      });
    }
  };

  const onReply = async () => {
    const feedID = _id as string;

    const formData = new FormData();

    formData.append("content", message);
    formData.append("feedID", feedID);
    replyImages.map((item: any) => formData.append("images", item));
    replyDocuments.map((item: any) => formData.append("documents", item));

    const result = await replyFeed(formData);

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: feedID,
          feed: result.feed,
        })
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: result.msg,
      });

      setOpen(false);
      setReplyImages([]);
      setReplyPreviewImages([]);
      setReplyDocuments([]);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.msg,
      });
    }
  };

  return (
    <View className="rounded-lg pt-3 px-3 mb-0">
      <View className="relative mb-2">
        <View className="flex-row items-center justify-between space-x-2 mb-3">
          <View className="flex-row items-center space-x-4">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
              }}
              className="w-10 h-10 rounded-full"
            />
            <View>
              <Text className="font-bold">{user?.username}</Text>
              <Text className="text-gray-500 text-xs">{"@alias"}</Text>
            </View>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">
              {createdAt?.toString()}
            </Text>
          </View>
        </View>
        <View className="flex-row mb-2 space-x-2">
          <View className="flex-row justify-center w-10">
            <View className="h-[100%] border-r border-r-gray-300"></View>
          </View>
          <View className="flex-1">
            <View className="w-full mb-3">
              <RenderHTML
                contentWidth={width}
                source={{
                  html: content || "",
                }}
              />
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <View className="flex-row items-center space-x-1">
                  <Pressable onPress={handleLikesFeed}>
                    {likes?.indexOf(currentUser?._id || "") !== -1 ? (
                      <MaterialCommunityIcons
                        color={"#EA4949"}
                        size={12}
                        name={"heart"}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color={"#000000"}
                        size={12}
                        name={"heart-outline"}
                      />
                    )}
                  </Pressable>
                  <Text className="text-xs">{likes?.length}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <Pressable
                    onPress={() => {
                      setOpen(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      color={"#000000"}
                      size={12}
                      name={"message-reply-text-outline"}
                    />
                  </Pressable>
                </View>
              </View>
              <Menu>
                <MenuTrigger>
                  {/* <MoreHorizontal color={"#4C4C4C"} size={16} /> */}
                  <MaterialCommunityIcons
                    color={"#4C4C4C"}
                    size={12}
                    name={"menu-down"}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsContainer: { borderRadius: 5, padding: 5 },
                  }}
                >
                  <MenuOption onSelect={() => {}}>
                    <View className="flex-row items-center space-x-2">
                      {/* <Copy color={"#4C4C4C"} size={12} /> */}
                      <MaterialCommunityIcons
                        color={"#4C4C4C"}
                        size={12}
                        name={"clipboard"}
                      />
                      <Text className="text-xs">Link kopieren</Text>
                    </View>
                  </MenuOption>
                  <MenuOption onSelect={() => {}}>
                    <View className="flex-row items-center space-x-2">
                      {/* <Pencil color={"#4C4C4C"} size={12} /> */}
                      <MaterialCommunityIcons
                        color={"#4C4C4C"}
                        size={12}
                        name={"pencil"}
                      />
                      <Text className="text-xs">Bearbeiten</Text>
                    </View>
                  </MenuOption>
                  <MenuOption onSelect={() => {}}>
                    <View className="flex-row items-center space-x-2">
                      {/* <Bell color={"#EF4444"} size={12} /> */}
                      <MaterialCommunityIcons
                        color={"#4C4C4C"}
                        size={12}
                        name={"bell"}
                      />
                      <Text className="text-xs text-[#EF4444]">
                        Beitrag melden
                      </Text>
                    </View>
                  </MenuOption>
                  <MenuOption onSelect={handleRemoveFeed}>
                    <View className="flex-row items-center space-x-2">
                      {/* <LogOut color={"#EF4444"} size={12} /> */}
                      <MaterialCommunityIcons
                        color={"#4C4C4C"}
                        size={12}
                        name={"logout"}
                      />
                      <Text className="text-xs text-[#EF4444]">Löschen</Text>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row">
        <View className="flex-row justify-center items-start w-10">
          <View className="justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <MaterialCommunityIcons
              color={"#888888"}
              size={16}
              name={"account"}
            />
          </View>
        </View>
        <View className="flex-1">
          <Pressable className="h-8 justify-center pl-2">
            <Text>Zeige alle Kommentare ({detail?.length || 0})</Text>
          </Pressable>
          <View className="flex-1 flex-row space-x-2 pt-3 pl-2">
            {detail &&
              detail.map((item: any, i: number) => (
                <View key={i} className="rounded-lg mb-2">
                  <View className="flex-row items-center justify-between space-x-2 mb-2">
                    <View className="flex-row items-center space-x-2">
                      <Image
                        source={{
                          uri: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                        }}
                        className="w-10 h-10 rounded-full"
                      />
                      <View>
                        <Text className="font-bold">{item.user.username}</Text>
                        <Text className="text-gray-500 text-xs">
                          {item.user.alias || "@username"}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-gray-500 text-xs">{item.date}</Text>
                    </View>
                  </View>
                  <View className="pl-12 mb-2">
                    <RenderHTML
                      contentWidth={width}
                      source={{
                        html: item.content || "",
                      }}
                    />
                  </View>
                </View>
              ))}
          </View>
        </View>
      </View>
      <View className="border-b border-gray-200"></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        className="flex flex-col"
      >
        <Pressable
          className="w-full h-2/3 bg-black/50"
          onPress={() => setOpen(false)}
        />
        <View className="w-full h-1/3 overflow-hidden flex p-3 bg-white">
          <View className="">
            <View className="bg-gray-200 rounded-lg p-5">
              <KeyboardAvoidingView>
                {/* <RichEditor
                  ref={richText}
                  initialContentHTML={message}
                  onChange={setMessage}
                  // editorInitializedCallback={}
                /> */}
              </KeyboardAvoidingView>
              {/* <RichToolbar
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.heading1,
                ]}
                iconMap={{ [actions.heading1]: handleHead }}
              /> */}
              <View className="flex-row items-center justify-between mt-3">
                <View className="flex-row space-x-2">
                  <Pressable>
                    <MaterialCommunityIcons
                      color={"#4C4C4C"}
                      size={16}
                      name={"plus-circle"}
                    />
                  </Pressable>
                  <Pressable>
                    <MaterialCommunityIcons
                      color={"#4C4C4C"}
                      size={16}
                      name={"image"}
                    />
                  </Pressable>
                  <Pressable>
                    <MaterialCommunityIcons
                      color={"#4C4C4C"}
                      size={16}
                      name={"face-man-outline"}
                    />
                  </Pressable>
                  <Pressable>
                    <MaterialCommunityIcons
                      color={"#4C4C4C"}
                      size={16}
                      name={"chart-bar"}
                    />
                  </Pressable>
                </View>
                <Pressable onPress={onReply}>
                  <MaterialCommunityIcons
                    color={"#4C4C4C"}
                    size={16}
                    name={"send"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
