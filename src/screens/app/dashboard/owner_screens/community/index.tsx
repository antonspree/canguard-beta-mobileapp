import React, { useMemo, useRef, useState } from "react";
import { ScrollView, useWindowDimensions, Pressable, View } from "react-native";
import { Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Image } from "expo-image";
import RenderHTML from "react-native-render-html";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { EmojiKeyboard, EmojiType } from "rn-emoji-keyboard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { IFeed, feedActions } from "@/store/reducers/feedReducer";
import {
  createFeed,
  likesFeed,
  removeFeed,
  replyFeed,
  udpateFeed,
  voteFeed,
} from "@/actions/feed";
import { getAvatarLetters, getTimeDifferenceInGerman } from "@/lib/function";
import { UPLOAD_URI } from "@/config/env";
import { Accordion } from "@/components/Accordion";
import Text from "@/elements/Text";
import CommHtmlEditor from "@/widgets/CommHtmlEditor";
import { useTheme } from "@/hooks/useThemeProvider";

const CommunityFeedPage = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const { user } = useAppSelector((state) => state.user);
  const { feed } = useAppSelector((state) => state.feed);

  const { width } = useWindowDimensions();

  const richText = useRef<RichEditor>(null);

  const [visibleEmoji, setVisibleEmoji] = useState(false);

  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState<Record<string, boolean>>({});

  const [message, setMessage] = useState("");
  const [images, setImages] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [previewImages, setPreviewImages] = useState<any>([]);
  const [votes, setVotes] = useState<any>([]);

  const [replyMessage, setReplyMessage] = useState("");
  const [replyImages, setReplyImages] = useState<any>([]);
  const [replyDocuments, setReplyDocuments] = useState<any>([]);
  const [replyPreviewImages, setReplyPreviewImages] = useState<any>([]);

  const [updateMessage, setUpdateMessage] = useState("");
  const [existImages, setExistImages] = useState<any>([]);
  const [updateImages, setUpdateImages] = useState<any>([]);
  const [existDocuments, setExistDocuments] = useState<any>([]);
  const [updateDocuments, setUpdateDocuments] = useState<any>([]);
  const [updatePreviewImages, setUpdatePreviewImages] = useState<any>([]);
  const [updateVotes, setUpdateVotes] = useState<any>([]);

  const [tempEditData, setTempEditData] = useState<IFeed>();
  const [tempData, setTempData] = useState<IFeed>();

  const themeColor = useMemo(() => {
    return colors;
  }, [colors]);

  const handleOnEmojiSelected = (emojiObject: EmojiType) => {
    richText.current?.insertText(emojiObject.emoji);
  };

  const handleImages = (image: any) => {
    if (image) {
      setImages([...images, image]);
      setPreviewImages([...previewImages, image]);
    }
  };

  const handleReplyImages = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setReplyImages([...replyImages, e.target.files && e.target.files[0]]);

      const reader: any = new FileReader();
      reader.onloadend = () => {
        setReplyPreviewImages([
          ...replyPreviewImages,
          { name: file.name, src: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImages = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setUpdateImages([...updateMessage, e.target.files && e.target.files[0]]);

      const reader: any = new FileReader();
      reader.onloadend = () => {
        setUpdatePreviewImages([
          ...updatePreviewImages,
          { name: file.name, src: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImg = (param: any) => {
    setImages(images.filter((item: any) => item.uri !== param.uri));
    setPreviewImages(
      previewImages.filter((item: any) => item.uri !== param.uri)
    );
  };

  const handleReplyRemoveImg = (param: string) => {
    setReplyImages(replyImages.filter((item: any) => item.name !== param));
    setReplyPreviewImages(
      replyPreviewImages.filter((item: any) => item.name !== param)
    );
  };

  const handleExistRemoveImg = (param: string) => {
    setExistImages(existImages.filter((item: any) => item !== param));
  };

  const handleUpdateRemoveImg = (param: string) => {
    setUpdateImages(updateImages.filter((item: any) => item.name !== param));
    setUpdatePreviewImages(
      updatePreviewImages.filter((item: any) => item.name !== param)
    );
  };

  const handleRemoveDoc = (param: string) => {
    setDocuments(documents.filter((item: any) => item.name !== param));
  };

  const handleReplyRemoveDoc = (param: string) => {
    setReplyDocuments(
      replyDocuments.filter((item: any) => item.name !== param)
    );
  };

  const handleExistRemoveDoc = (param: string) => {
    setExistDocuments(
      existDocuments.filter((item: any) => item.source !== param)
    );
  };

  const handleUpdateRemoveDoc = (param: string) => {
    setUpdateDocuments(
      updateDocuments.filter((item: any) => item.name !== param)
    );
  };

  const handleVoteChange = (id: string, e: any) => {
    const newVote = votes.map((vote: any) =>
      vote.id === id ? { ...vote, value: e.target.value } : vote
    );

    setVotes(newVote);
  };

  const handleUpdateVoteChange = (id: string, e: any) => {
    const newVote = updateVotes.map((vote: any) =>
      vote.id === id ? { ...vote, value: e.target.value } : vote
    );

    setUpdateVotes(newVote);
  };

  const handleCollapsible = (param: string) => {
    setCommentsOpen((prevState) => ({
      ...prevState,
      [param]: !prevState[param],
    }));
  };

  const handleClipboard = async (param: string) => {
    await navigator.clipboard.writeText(param);

    Toast.show({
      type: "error",
      text2: "Link in die Zwischenablage kopiert.",
    });
  };

  const handleEditFeed = async (param: IFeed) => {
    setEditOpen(true);
    setTempEditData(param);

    setUpdateMessage(param.content as string);
    setExistImages(param.images);
    setExistDocuments(param.documents);
    setUpdateVotes(param.votes);
  };

  const handleReply = (param: IFeed) => {
    setReplyOpen(true);
    setTempData(param);
  };

  const handleRemoveFeed = async (param: string) => {
    const result = await removeFeed({ feedID: param });

    Toast.show({
      type: "error",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(feedActions.setFeed({ feed: result.feed }));
    }
  };

  const handleLikesFeed = async (param: string) => {
    const result = await likesFeed({ feedID: param });

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: param,
          feed: result.feed,
        })
      );
    }
  };

  const handleVoteFeed = async (feedID: string, voteID: string) => {
    const result = await voteFeed({ feedID: feedID, voteID: voteID });

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: feedID,
          feed: result.feed,
        })
      );
    }
  };

  const onSend = async (param: string) => {
    const formData = new FormData();

    formData.append("content", param);
    formData.append("votes", JSON.stringify(votes));
    images.map((item: any) => formData.append("images", item));
    documents.map((item: any) => formData.append("documents", item));

    const result = await createFeed(formData);

    Toast.show({
      type: "error",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(feedActions.setFeed({ feed: result.feed }));

      setImages([]);
      setPreviewImages([]);
      setDocuments([]);
      setVotes([]);
    }
  };

  const onReply = async (param: string) => {
    const feedID = tempData?._id as string;

    const formData = new FormData();

    formData.append("content", param);
    formData.append("feedID", feedID);
    replyImages.map((item: any) => formData.append("images", item));
    replyDocuments.map((item: any) => formData.append("documents", item));

    const result = await replyFeed(formData);

    Toast.show({
      type: "error",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: feedID,
          feed: result.feed,
        })
      );

      setReplyOpen(false);
      setTempData(undefined);
      setReplyImages([]);
      setReplyPreviewImages([]);
      setReplyDocuments([]);
    }
  };

  const onUpdate = async (param: string) => {
    const feedID = tempEditData?._id as string;

    const formData = new FormData();

    formData.append("content", param);
    formData.append("feedID", feedID);
    formData.append("votes", JSON.stringify(updateVotes));
    formData.append("existImgs", JSON.stringify(existImages));
    formData.append("existDocs", JSON.stringify(existDocuments));

    updateImages.map((item: any) => formData.append("images", item));
    updateDocuments.map((item: any) => formData.append("documents", item));

    const result = await udpateFeed(formData);

    Toast.show({
      type: "error",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(
        feedActions.updateFeed({
          feedID: feedID,
          feed: result.feed,
        })
      );

      setEditOpen(false);
      setTempEditData(undefined);
      setUpdateImages([]);
      setExistImages([]);
      setExistDocuments([]);
      setUpdatePreviewImages([]);
      setUpdateDocuments([]);
    }
  };

  return (
    <ScrollView>
      <View className="p-5">
        <View className="space-y-2 mb-2">
          <CommHtmlEditor
            message={message}
            setMessage={setMessage}
            disabled={
              user?.role !== "owner" &&
              !user?.functions?.includes("club-community-feed-create")
            }
            documents={documents}
            setDocuments={setDocuments}
            handleImages={handleImages}
            votes={votes}
            setVotes={setVotes}
            onSend={onSend}
            imgsCount={images.length}
            docsCount={documents.length}
          />
          {votes.length > 0 && (
            <View className="space-y-3">
              {votes.map((item: any, key: string) => {
                return (
                  <View className="flex items-center space-x-3" key={key}>
                    <TextInput
                      className="max-w-md w-full"
                      value={item.value}
                      placeholder={`Antwort ${key + 1}`}
                      onChange={(e) => handleVoteChange(item.id, e)}
                    />
                    <Pressable
                      onPress={() =>
                        setVotes(
                          votes.filter((vote: any) => vote.id !== item.id)
                        )
                      }
                    >
                      <MaterialCommunityIcons
                        color={"#000000"}
                        size={20}
                        name={"folder"}
                      />
                    </Pressable>
                  </View>
                );
              })}
              <Pressable
                className="w-fit text-custom text-sm"
                onPress={() =>
                  setVotes([...votes, { id: Date.now(), value: "" }])
                }
              >
                <Text>Abstimmung hinzufügen</Text>
              </Pressable>
            </View>
          )}
          {previewImages.length > 0 && (
            <View className="flex-row flex-wrap gap-3">
              {previewImages.map((item: any, key: string) => {
                return (
                  <View className="relative w-20 h-16" key={key}>
                    <Image
                      className="w-20 h-16 rounded-lg"
                      source={{ uri: item.uri }}
                      alt="preview"
                    />
                    <Pressable
                      className="absolute -top-3 -right-2 p-1 z-10"
                      onPress={() => handleRemoveImg(item)}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={16}
                        color={"#ef4444"}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
          {documents.length > 0 && (
            <View className="gap-3">
              {documents.map((item: any, key: string) => {
                return (
                  <View className="relative" key={key}>
                    <View className="w-full flex-row items-center justify-between space-x-3 p-3 bg-[#F7F7F7] rounded-xl">
                      <View className="flex-1 flex-row items-center space-x-3">
                        <MaterialCommunityIcons
                          color={"#8E8E8E"}
                          size={32}
                          name={"file-document"}
                        />
                        <Text
                          className="overflow-hidden text-sm text-content break-all"
                          // style={{
                          //   display: "-webkit-box",
                          //   WebkitLineClamp: 1,
                          //   WebkitBoxOrient: "vertical",
                          // }}
                        >
                          {item?.assets[0]?.name}
                        </Text>
                      </View>
                      <Pressable
                        className="rounded-full"
                        onPress={() => handleRemoveDoc(item?.name)}
                      >
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={16}
                          color={"#ef4444"}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        {feed.length > 0 && (
          <View className="space-y-6 mt-2">
            {feed.map((item, key) => {
              return (
                <View className="space-y-1.5" key={key}>
                  <View className="flex-row space-x-3">
                    <View className="items-center space-y-1.5">
                      <View className="w-10 h-10">
                        {item.user?.avatar ? (
                          <Image
                            source={UPLOAD_URI + item.user?.avatar}
                            className="w-10 h-10 bg-[#EFEFEF] rounded-full"
                          />
                        ) : (
                          <Avatar.Text
                            className="text-white bg-custom"
                            label={getAvatarLetters(item.user?.username) || ""}
                          />
                        )}
                      </View>
                      {item.detail && item.detail.length > 0 && (
                        <View className="flex-1 w-[1px] bg-[#ECECEC]" />
                      )}
                    </View>
                    <View className="flex-1 space-y-2">
                      <View className="flex-row justify-between">
                        <View>
                          <Text variant="titleSmall">
                            {item.user?.username}
                          </Text>
                          <Text variant="bodySmall" className="text-[#8E8E8E]">
                            {item.user?.alias ? item.user.alias : "@username"}
                          </Text>
                        </View>
                        <Text
                          variant="bodySmall"
                          className="text-[#8E8E8E] pt-1"
                        >
                          {getTimeDifferenceInGerman(item.date as string)}
                        </Text>
                      </View>
                      <RenderHTML
                        contentWidth={width}
                        source={{
                          html: item.content || "",
                        }}
                        tagsStyles={{
                          code: {
                            position: "relative",
                            backgroundColor: "#f4f4f5",
                            padding: 3,
                            fontSize: 14,
                            lineHeight: 20,
                            fontStyle: "normal",
                            fontFamily: "monospace",
                            fontWeight: 600,
                            borderRadius: 4,
                          },
                          blockquote: {
                            paddingLeft: 12,
                            marginLeft: 0,
                            fontSize: 14,
                            lineHeight: 20,
                            fontStyle: "italic",
                            borderLeftWidth: 3,
                            borderLeftColor: "#f4f4f5",
                          },
                        }}
                      />
                      {item.votes && item.votes?.length > 0 && (
                        <View className="space-y-2">
                          {item.votes.map((vote, key) => {
                            const votePercent =
                              item.votes &&
                              vote.voters &&
                              vote.voters.length > 0
                                ? Math.trunc(
                                    (vote.voters.length /
                                      item.votes.reduce(
                                        (total, vote) =>
                                          vote.voters
                                            ? total + vote.voters.length
                                            : total,
                                        0
                                      )) *
                                      100
                                  )
                                : 0;
                            return (
                              <Pressable
                                className="relative flex-row items-center justify-between pl-2 pr-2 py-2 border rounded-md overflow-hidden border-[#E4E4E7]"
                                key={key}
                                onPress={() =>
                                  handleVoteFeed(item._id as string, vote.id)
                                }
                              >
                                <View
                                  className={`absolute bg-custom top-0 bottom-0 left-0 right-${
                                    votePercent === 0
                                      ? "100%"
                                      : votePercent === 100
                                      ? "0"
                                      : `[${100 - votePercent}%]`
                                  } bg-[${colors.bgColor}]`}
                                />
                                <Text variant="bodySmall" className="z-10">
                                  {vote.value}
                                </Text>
                                <Text variant="bodySmall" className="z-10">
                                  {item.votes &&
                                  vote.voters &&
                                  vote.voters.length > 0
                                    ? `${Math.trunc(
                                        (vote.voters.length /
                                          item.votes.reduce(
                                            (total, vote) =>
                                              vote.voters
                                                ? total + vote.voters.length
                                                : total,
                                            0
                                          )) *
                                          100
                                      )}%`
                                    : "0%"}
                                </Text>
                              </Pressable>
                            );
                          })}
                          <Text variant="bodySmall">
                            {item.votes.reduce(
                              (total, vote) =>
                                vote.voters
                                  ? total + vote.voters.length
                                  : total,
                              0
                            )}
                            {` Stimmen insgesamt`}
                          </Text>
                        </View>
                      )}
                      {item.images && item.images.length > 0 && (
                        <View className="space-y-3">
                          {item.images.map((img, key) => {
                            return (
                              <View className="relative w-full h-32" key={key}>
                                <Image
                                  className="w-full h-full border border-[#F7F7F7] rounded-xl"
                                  source={{ uri: UPLOAD_URI + img }}
                                  contentFit="cover"
                                />
                              </View>
                            );
                          })}
                        </View>
                      )}
                      {item.documents && item.documents.length > 0 && (
                        <View className="flex flex-wrap gap-3">
                          {item.documents.map((doc, key) => {
                            return (
                              <View className="relative w-44 h-16" key={key}>
                                <View className="flex-row justify-center items-center space-x-3 p-2 bg-[#F7F7F7] rounded-xl">
                                  <MaterialCommunityIcons
                                    color={"#8E8E8E"}
                                    size={32}
                                    name={"file-document"}
                                  />
                                  <Pressable
                                    className="overflow-hidden text-sm text-content break-all"
                                    // href={
                                    //   process.env.NEXT_PUBLIC_UPLOAD_URI +
                                    //   doc.source
                                    // }
                                    // target="_blank"
                                    // style={{
                                    //   display: "-webkit-box",
                                    //   WebkitLineClamp: 1,
                                    //   WebkitBoxOrient: "vertical",
                                    // }}
                                  >
                                    <Text>{doc.docname}</Text>
                                  </Pressable>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      )}
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center space-x-3">
                          <View className="flex-row items-center space-x-1">
                            <Pressable
                              onPress={() =>
                                handleLikesFeed(item._id as string)
                              }
                            >
                              <MaterialCommunityIcons
                                color={
                                  item.likes &&
                                  item.likes.filter(
                                    (like) => like === user?._id
                                  ).length > 0
                                    ? "red"
                                    : "black"
                                }
                                size={16}
                                name={
                                  item.likes &&
                                  item.likes.filter(
                                    (like) => like === user?._id
                                  ).length > 0
                                    ? "heart"
                                    : "heart-outline"
                                }
                              />
                            </Pressable>
                            <Text>{item.likes?.length}</Text>
                          </View>
                          <Pressable onPress={() => handleReply(item)}>
                            <Feather
                              name="message-circle"
                              size={16}
                              color="#000000"
                            />
                          </Pressable>
                        </View>
                        <Menu>
                          <MenuTrigger>
                            <Feather
                              name="more-vertical"
                              size={14}
                              color="black"
                            />
                          </MenuTrigger>
                          <MenuOptions
                            customStyles={{
                              optionsContainer: {
                                borderRadius: 5,
                                padding: 5,
                              },
                            }}
                          >
                            <MenuOption
                              onSelect={() => {
                                handleClipboard(
                                  process.env.NEXT_PUBLIC_CLIENT_URI +
                                    "club/community"
                                );
                              }}
                            >
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
                            <MenuOption
                              onSelect={() => {
                                handleEditFeed(item);
                              }}
                            >
                              <View className="flex-row items-center space-x-2">
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
                                  color={"#EF4444"}
                                  size={12}
                                  name={"bell"}
                                />
                                <Text className="text-xs text-[#EF4444]">
                                  Beitrag melden
                                </Text>
                              </View>
                            </MenuOption>
                            <MenuOption
                              onSelect={() =>
                                handleRemoveFeed(item._id as string)
                              }
                            >
                              <View className="flex-row items-center space-x-2">
                                {/* <LogOut color={"#EF4444"} size={12} /> */}
                                <MaterialCommunityIcons
                                  color={"#EF4444"}
                                  size={12}
                                  name={"logout"}
                                />
                                <Text className="text-xs text-[#EF4444]">
                                  Löschen
                                </Text>
                              </View>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    </View>
                  </View>
                  {item.detail && item.detail.length > 0 && (
                    <View className="flex-row space-x-2">
                      <View className="w-10 flex-row justify-center">
                        <View className="w-8 h-8 flex-row justify-center items-center bg-[#EFEFEF] rounded-full">
                          <MaterialCommunityIcons
                            color={"#8E8E8E"}
                            size={16}
                            name={"account"}
                          />
                        </View>
                      </View>
                      <Accordion
                        title={
                          <View className="h-7 items-center justify-center">
                            <Text
                              variant="bodySmall"
                              className="text-[#00A3FF]"
                            >
                              {commentsOpen[item._id as string]
                                ? `Kommentare ausblenden (${item.detail.length})`
                                : `Zeige alle Kommentare (${item.detail.length})`}
                            </Text>
                          </View>
                        }
                        expanded={commentsOpen[item._id as string]}
                        onHeaderPress={() =>
                          handleCollapsible(item._id as string)
                        }
                        className="flex-1"
                      >
                        <View className="py-3">
                          {item.detail.map((detail, key) => {
                            return (
                              <View
                                className="flex-1 flex-row space-x-2"
                                key={key}
                              >
                                <View className="items-center space-y-1.5">
                                  <View className="w-10 h-10">
                                    {detail.user?.avatar ? (
                                      <Image
                                        source={
                                          UPLOAD_URI + detail.user?.avatar
                                        }
                                        className="w-10 h-10 bg-[#EFEFEF] rounded-full"
                                      />
                                    ) : (
                                      <Avatar.Text
                                        className="w-10 h-10 text-white bg-custom"
                                        label={
                                          getAvatarLetters(
                                            detail.user?.username
                                          ) || ""
                                        }
                                      />
                                    )}
                                  </View>
                                </View>
                                <View className="flex-1">
                                  <View className="flex-row justify-between">
                                    <View>
                                      <Text variant="titleSmall">
                                        {detail.user?.username}
                                      </Text>
                                      <Text
                                        variant="bodySmall"
                                        className="text-[#8E8E8E]"
                                      >
                                        {detail.user?.alias
                                          ? detail.user.alias
                                          : "@username"}
                                      </Text>
                                    </View>
                                    <Text
                                      variant="bodySmall"
                                      className="text-[#8E8E8E] pt-1"
                                    >
                                      {getTimeDifferenceInGerman(
                                        detail.date as string
                                      )}
                                    </Text>
                                  </View>
                                  <RenderHTML
                                    contentWidth={width}
                                    source={{
                                      html: item.content || "",
                                    }}
                                    tagsStyles={{
                                      code: {
                                        position: "relative",
                                        backgroundColor: "#f4f4f5",
                                        padding: 3,
                                        fontSize: 14,
                                        lineHeight: 20,
                                        fontStyle: "normal",
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                        borderRadius: 4,
                                      },
                                      blockquote: {
                                        paddingLeft: 12,
                                        marginLeft: 0,
                                        fontSize: 14,
                                        lineHeight: 20,
                                        fontStyle: "italic",
                                        borderLeftWidth: 3,
                                        borderLeftColor: "#f4f4f5",
                                      },
                                    }}
                                  />
                                  {detail.images &&
                                    detail.images.length > 0 && (
                                      <View className=" space-y-3">
                                        {detail.images.map((img, key) => {
                                          return (
                                            <View
                                              className="relative w-full h-32"
                                              key={key}
                                            >
                                              <Image
                                                className="w-full h-full border border-[#F7F7F7] rounded-xl"
                                                source={{
                                                  uri: UPLOAD_URI + img,
                                                }}
                                                contentFit="cover"
                                              />
                                            </View>
                                          );
                                        })}
                                      </View>
                                    )}
                                  {detail.documents &&
                                    detail.documents.length > 0 && (
                                      <View className="flex flex-wrap gap-3">
                                        {detail.documents.map((doc, key) => {
                                          return (
                                            <View
                                              className="relative w-44 h-16"
                                              key={key}
                                            >
                                              <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                                <MaterialCommunityIcons
                                                  color={"#8E8E8E"}
                                                  size={16}
                                                  name={"account"}
                                                />
                                                <Pressable
                                                  className="overflow-hidden text-sm text-content break-all"
                                                  // href={
                                                  //   process.env
                                                  //     .NEXT_PUBLIC_UPLOAD_URI +
                                                  //   doc.source
                                                  // }
                                                  // target="_blank"
                                                  // style={{
                                                  //   display:
                                                  //     "-webkit-box",
                                                  //   WebkitLineClamp: 1,
                                                  //   WebkitBoxOrient:
                                                  //     "vertical",
                                                  // }}
                                                >
                                                  {doc.docname}
                                                </Pressable>
                                              </View>
                                            </View>
                                          );
                                        })}
                                      </View>
                                    )}
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </Accordion>
                    </View>
                  )}
                </View>
              );
            })}
            <Portal>
              <Dialog
                visible={replyOpen}
                onDismiss={() => setReplyOpen(false)}
                style={{ backgroundColor: "white", borderRadius: 10 }}
              >
                <Dialog.Title>
                  <Text variant="titleMedium">Kommentar schreiben</Text>
                </Dialog.Title>
                <Dialog.Content>
                  <ScrollView className="max-h-[500px] space-y-3">
                    <View className="space-y-1">
                      <View className="flex-row space-x-3">
                        <View className="items-center space-y-1">
                          <View className="w-8 h-8">
                            {tempData?.user?.avatar ? (
                              <Image
                                source={UPLOAD_URI + tempData?.user?.avatar}
                                className="w-8 h-8 bg-[#EFEFEF] rounded-full"
                              />
                            ) : (
                              <Avatar.Text
                                className="text-white bg-custom"
                                label={
                                  getAvatarLetters(tempData?.user?.username) ||
                                  ""
                                }
                              />
                            )}
                          </View>
                          <View className="flex-1 w-[1px] bg-[#ECECEC]" />
                        </View>
                        <View className="w-full  space-y-2">
                          <View className="flex-row space-x-3">
                            <View>
                              <Text variant="titleSmall">
                                {tempData?.user?.username}
                              </Text>
                              <Text
                                variant="bodySmall"
                                className="text-[#8E8E8E]"
                              >
                                {tempData?.user?.alias
                                  ? tempData.user.alias
                                  : "@username"}
                              </Text>
                            </View>
                            <Text
                              variant="bodySmall"
                              className="text-[#8E8E8E] pt-1"
                            >
                              {getTimeDifferenceInGerman(
                                tempData?.date as string
                              )}
                            </Text>
                          </View>
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: tempData?.content || "",
                            }}
                            tagsStyles={{
                              code: {
                                position: "relative",
                                backgroundColor: "#f4f4f5",
                                padding: 3,
                                fontSize: 14,
                                lineHeight: 20,
                                fontStyle: "normal",
                                fontFamily: "monospace",
                                fontWeight: 600,
                                borderRadius: 4,
                              },
                              blockquote: {
                                paddingLeft: 12,
                                marginLeft: 0,
                                fontSize: 14,
                                lineHeight: 20,
                                fontStyle: "italic",
                                borderLeftWidth: 3,
                                borderLeftColor: "#f4f4f5",
                              },
                            }}
                          />
                          <View className="flex-row items-center space-x-1 py-5 text-sm">
                            <Text
                              variant="bodySmall"
                              className="text-[#8E8E8E]"
                            >
                              Antworten auf
                            </Text>
                            <Text
                              variant="bodySmall"
                              className="text-[#00A3FF]"
                            >
                              {tempData?.user?.alias
                                ? tempData.user.alias
                                : "@username"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex-row items-center space-x-3">
                        <View className="w-8 h-8 flex-row justify-center items-center bg-[#EFEFEF] rounded-full">
                          <MaterialCommunityIcons
                            color={"#808080"}
                            size={16}
                            name={"account"}
                          />
                        </View>
                        <Text variant="bodySmall" className="text-[#8E8E8E]">
                          Schreib deinen Kommentar
                        </Text>
                      </View>
                    </View>
                    <View className=" space-y-3">
                      <CommHtmlEditor
                        message={replyMessage}
                        setMessage={setReplyMessage}
                        documents={replyDocuments}
                        setDocuments={setReplyDocuments}
                        handleImages={handleReplyImages}
                        votes={votes}
                        setVotes={setVotes}
                        onSend={onReply}
                        imgsCount={replyImages.length}
                        docsCount={replyDocuments.length}
                        themeColor={themeColor}
                      />
                      {replyPreviewImages.length > 0 && (
                        <View className="flex flex-wrap gap-3">
                          {replyPreviewImages.map((item: any, key: string) => {
                            return (
                              <View className="relative w-36 h-24" key={key}>
                                <Image
                                  className="object-cover rounded-xl"
                                  source={item.src}
                                  alt="preview"
                                />
                                <Pressable
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                  onPress={() =>
                                    handleReplyRemoveImg(item.name)
                                  }
                                >
                                  <MaterialCommunityIcons
                                    color={"#000000"}
                                    size={16}
                                    name={"trash-can"}
                                  />
                                </Pressable>
                              </View>
                            );
                          })}
                        </View>
                      )}
                      {replyDocuments.length > 0 && (
                        <View className="flex flex-wrap gap-3">
                          {replyDocuments.map((item: any, key: string) => {
                            return (
                              <View className="relative w-36 h-14" key={key}>
                                <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                  <MaterialCommunityIcons
                                    color={"#8E8E8E"}
                                    size={32}
                                    name={"file-document"}
                                  />
                                  <Text
                                    className="overflow-hidden text-sm text-content break-all"
                                    // style={{
                                    //   display: "-webkit-box",
                                    //   WebkitLineClamp: 1,
                                    //   WebkitBoxOrient: "vertical",
                                    // }}
                                  >
                                    {item?.name}
                                  </Text>
                                </View>
                                <Pressable
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                  onPress={() =>
                                    handleReplyRemoveDoc(item?.name)
                                  }
                                >
                                  <MaterialCommunityIcons
                                    color={"#000000"}
                                    size={16}
                                    name={"trash-can"}
                                  />
                                </Pressable>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </Dialog.Content>
              </Dialog>
            </Portal>
            <Portal>
              <Dialog
                visible={editOpen}
                onDismiss={() => setEditOpen(false)}
                style={{ backgroundColor: "white", borderRadius: 10 }}
              >
                <Dialog.Title>
                  <Text variant="titleMedium">Feed bearbeiten</Text>
                </Dialog.Title>
                <Dialog.Content className="max-w-[544px] p-0">
                  <ScrollView className="max-h-[500px] space-y-3 p-3">
                    <View className="flex-row space-x-3">
                      <View className="w-8 h-8">
                        {tempEditData?.user?.avatar ? (
                          <Image
                            source={UPLOAD_URI + tempEditData?.user?.avatar}
                            className="w-8 h-8 bg-[#EFEFEF] rounded-full"
                          />
                        ) : (
                          <Avatar.Text
                            className="text-white bg-custom"
                            label={
                              getAvatarLetters(tempEditData?.user?.username) ||
                              ""
                            }
                          />
                        )}
                      </View>
                      <View className="flex-1 space-y-3">
                        <View className="flex-row justify-between">
                          <View>
                            <Text variant="titleSmall">
                              {tempEditData?.user?.username}
                            </Text>
                            <Text
                              variant="bodySmall"
                              className="text-[#8E8E8E]"
                            >
                              {tempEditData?.user?.alias
                                ? tempEditData?.user.alias
                                : "@username"}
                            </Text>
                          </View>
                          <Text
                            variant="bodySmall"
                            className="text-[#8E8E8E] pt-1"
                          >
                            {getTimeDifferenceInGerman(
                              tempEditData?.date as string
                            )}
                          </Text>
                        </View>
                        {/* <CommunityTiptap
                            message={updateMessage}
                            setMessage={setUpdateMessage}
                            documents={updateDocuments}
                            setDocuments={setUpdateDocuments}
                            handleImages={handleUpdateImages}
                            votes={updateVotes}
                            setVotes={setUpdateVotes}
                            onSend={onUpdate}
                            imgsCount={updateImages.length + existImages.length}
                            docsCount={
                              updateDocuments.length + existDocuments.length
                            }
                          /> */}
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
                                  name={"sticker-emoji"}
                                />
                              </Pressable>
                            </View>
                          </ScrollView>
                          <RichEditor
                            ref={richText}
                            onChange={setUpdateMessage}
                            placeholder="Schreiben Sie Ihre Nachricht"
                            initialHeight={32}
                            style={{
                              backgroundColor: "#ffffff",
                              maxHeight: 180,
                              overflow: "hidden",
                              borderWidth: 1,
                              borderColor: "#808080",
                            }}
                            initialContentHTML={updateMessage}
                            initialFocus
                          />
                        </View>
                        {updateVotes.length > 0 && (
                          <View className="space-y-2">
                            {updateVotes.map((item: any, key: string) => {
                              return (
                                <View
                                  className="flex-row items-center space-x-3"
                                  key={key}
                                >
                                  <TextInput
                                    className="flex-1"
                                    value={item.value}
                                    placeholder={`Antwort ${key + 1}`}
                                    onChange={(e) =>
                                      handleUpdateVoteChange(item.id, e)
                                    }
                                    disabled={
                                      item.voters && item.voters.length > 0
                                    }
                                  />
                                  {!(item.voters && item.voters.length > 0) && (
                                    <Pressable
                                      onPress={() =>
                                        setUpdateVotes(
                                          updateVotes.filter(
                                            (vote: any) => vote.id !== item.id
                                          )
                                        )
                                      }
                                    >
                                      <MaterialCommunityIcons
                                        color={"#000000"}
                                        size={16}
                                        name={"minus-circle-outline"}
                                      />
                                    </Pressable>
                                  )}
                                </View>
                              );
                            })}
                            <Pressable
                              className="w-fit text-custom text-sm"
                              onPress={() =>
                                setUpdateVotes([
                                  ...updateVotes,
                                  { id: Date.now(), value: "" },
                                ])
                              }
                            >
                              <Text
                                variant="bodySmall"
                                className="text-[#00A3FF]"
                              >
                                Abstimmung hinzufügen
                              </Text>
                            </Pressable>
                          </View>
                        )}
                        <View className="flex flex-wrap gap-3">
                          {existImages.length > 0 &&
                            existImages.map((item: any, key: string) => {
                              return (
                                <View className="relative w-36 h-24" key={key}>
                                  <Image
                                    className="w-full h-full border border-[#F7F7F7] rounded-xl"
                                    source={{
                                      uri: UPLOAD_URI + item,
                                    }}
                                    contentFit="cover"
                                  />
                                  <Pressable
                                    className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                    onPress={() => handleExistRemoveImg(item)}
                                  >
                                    <MaterialCommunityIcons
                                      color={"#EF4444"}
                                      size={16}
                                      name={"trash-can"}
                                    />
                                  </Pressable>
                                </View>
                              );
                            })}
                          {updatePreviewImages.length > 0 &&
                            updatePreviewImages.map(
                              (item: any, key: string) => {
                                return (
                                  <View
                                    className="relative w-36 h-24"
                                    key={key}
                                  >
                                    <Image
                                      className="object-cover rounded-xl"
                                      source={item.src}
                                    />
                                    <Pressable
                                      className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                      onPress={() =>
                                        handleUpdateRemoveImg(item.name)
                                      }
                                    >
                                      <MaterialCommunityIcons
                                        color={"#000000"}
                                        size={16}
                                        name={"trash-can"}
                                      />
                                    </Pressable>
                                  </View>
                                );
                              }
                            )}
                        </View>
                        <View className="flex flex-wrap gap-3">
                          {existDocuments.map((item: any, key: string) => {
                            return (
                              <View className="relative w-36 h-14" key={key}>
                                <View className="flex-row w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                  <MaterialCommunityIcons
                                    color={"#8E8E8E"}
                                    size={32}
                                    name={"file-document"}
                                  />
                                  <Text
                                    variant="bodySmall"
                                    className="text-[#8E8E8E]"
                                  >
                                    {item.docname}
                                  </Text>
                                </View>
                                <Pressable
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                  onPress={() =>
                                    handleExistRemoveDoc(item.source)
                                  }
                                >
                                  <MaterialCommunityIcons
                                    color={"#EF4444"}
                                    size={16}
                                    name={"trash-can"}
                                  />
                                </Pressable>
                              </View>
                            );
                          })}
                          {updateDocuments.length > 0 &&
                            updateDocuments.map((item: any, key: string) => {
                              return (
                                <View className="relative w-36 h-14" key={key}>
                                  <View className="w-full h-full flex justify-center items-center space-x-2 px-3 bg-[#F7F7F7] rounded-xl">
                                    <MaterialCommunityIcons
                                      color={"#8E8E8E"}
                                      size={32}
                                      name={"file-document"}
                                    />
                                    <Text
                                      className="overflow-hidden text-sm text-content break-all"
                                      // style={{
                                      //   display: "-webkit-box",
                                      //   WebkitLineClamp: 1,
                                      //   WebkitBoxOrient: "vertical",
                                      // }}
                                    >
                                      {item?.name}
                                    </Text>
                                  </View>
                                  <Pressable
                                    className="absolute -top-2 -right-2 p-1 rounded-full z-10"
                                    onPress={() =>
                                      handleUpdateRemoveDoc(item?.name)
                                    }
                                  >
                                    <MaterialCommunityIcons
                                      color={"#000000"}
                                      size={16}
                                      name={"trash-can"}
                                    />
                                  </Pressable>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CommunityFeedPage;
