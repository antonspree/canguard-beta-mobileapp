import React, { useRef, useState } from "react";
import { ScrollView, useWindowDimensions, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { Avatar, Dialog, List, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
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
import Text from "@/elements/Text";
import { getAvatarLetters, getTimeDifferenceInGerman } from "@/lib/function";
import { UPLOAD_URI } from "@/config/env";

const CommunityFeedPage = () => {
  const dispatch = useAppDispatch();
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

  const handleOnEmojiSelected = (emojiObject: EmojiType) => {
    console.log(emojiObject);
    richText.current?.insertText(emojiObject.emoji);
  };

  const handleImages = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImages([...images, e.target.files && e.target.files[0]]);

      const reader: any = new FileReader();
      reader.onloadend = () => {
        setPreviewImages([
          ...previewImages,
          { name: file.name, src: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
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

  const handleRemoveImg = (param: string) => {
    setImages(images.filter((item: any) => item.name !== param));
    setPreviewImages(previewImages.filter((item: any) => item.name !== param));
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
    <View className="m-5">
      <View>
        <View className="space-y-3">
          {/* <CommunityTiptap
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
              /> */}
          {votes.length > 0 && (
            <View className=" space-y-3">
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
                className="w-fit text-custom text-sm cursor-pointer hover:text-customhover"
                onPress={() =>
                  setVotes([...votes, { id: Date.now(), value: "" }])
                }
              >
                <Text>Abstimmung hinzufügen</Text>
              </Pressable>
            </View>
          )}
          {previewImages.length > 0 && (
            <View className="flex flex-wrap gap-3">
              {previewImages.map((item: any, key: string) => {
                return (
                  <View className="relative w-44 h-32 mobile:w-full" key={key}>
                    <Image
                      className="object-cover rounded-xl"
                      source={item.src}
                      alt="preview"
                    />
                    <Pressable
                      className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                      onPress={() => handleRemoveImg(item.name)}
                    >
                      <MaterialCommunityIcons
                        color={"#000000"}
                        size={20}
                        name={"sticker-emoji"}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
          {documents.length > 0 && (
            <View className="flex flex-wrap gap-3">
              {documents.map((item: any, key: string) => {
                return (
                  <View className="relative w-44 h-16 mobile:w-full" key={key}>
                    <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                      <Image
                        source={require("@/assets/images/document.png")}
                        className="w-[24px] h-[40px]"
                        alt="document"
                      />
                      <Text
                        className="overflow-hidden text-sm text-content break-all mobile:text-xs"
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
                      className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                      onPress={() => handleRemoveDoc(item?.name)}
                    >
                      <MaterialCommunityIcons
                        color={"#000000"}
                        size={20}
                        name={"sticker-emoji"}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        {feed.length > 0 && (
          <View className=" space-y-5 mt-10 tablet:space-y-3 tablet:mt-5">
            {feed.map((item, key) => {
              return (
                <View className=" space-y-1.5" key={key}>
                  <View className="flex space-x-5 tablet:space-x-3">
                    <View className=" items-center space-y-1.5">
                      <View className="w-10 h-10">
                        <Image
                          source={UPLOAD_URI + item.user?.avatar}
                          className="w-10 h-10"
                        />
                        <Avatar.Text
                          className="text-white bg-custom"
                          label={getAvatarLetters(item.user?.username) || ""}
                        />
                      </View>
                      {item.detail && item.detail.length > 0 && (
                        <View className="w-[1px] h-full bg-[#ECECEC]" />
                      )}
                    </View>
                    <View className="w-full  space-y-4 tablet:space-y-2">
                      <View className="flex space-x-3 tablet:flex-col tablet:space-x-0">
                        <Text className="font-bold">{item.user?.username}</Text>
                        <View className="flex items-center space-x-2 mobile:space-x-1">
                          <Text className="text-sm text-content">
                            {item.user?.alias ? item.user.alias : "@username"}
                          </Text>
                          <View className="w-[3px] h-[3px] bg-content rounded-full" />
                          <Text className="text-xs text-content">
                            {getTimeDifferenceInGerman(item.date as string)}
                          </Text>
                        </View>
                      </View>
                      <RenderHTML
                        contentWidth={width}
                        source={{
                          html: item.content || "",
                        }}
                        defaultTextProps={{
                          selectable: true,
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
                        <View className="max-w-lg w-full  space-y-3">
                          {item.votes.map((vote, key) => {
                            return (
                              <Pressable
                                className="overflow-hidden relative h-full flex items-center justify-between pl-10 pr-2 py-2 border rounded-md cursor-pointer tablet:pl-5 mobile:p-2"
                                key={key}
                                onPress={() =>
                                  handleVoteFeed(item._id as string, vote.id)
                                }
                              >
                                <View
                                  className="absolute bg-custom h-full left-0"
                                  style={{
                                    width:
                                      item.votes &&
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
                                        : 0,
                                  }}
                                />
                                <Text className="text-sm z-10">
                                  {vote.value}
                                </Text>
                                <Text className="text-sm z-10">
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
                          <Text className="text-xs text-content">
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
                        <View className=" space-y-3">
                          {item.images.map((img, key) => {
                            return (
                              <View className="relative w-full h-32" key={key}>
                                <Image
                                  className="object-cover border border-[#F7F7F7] rounded-xl"
                                  source={UPLOAD_URI + img}
                                  alt="post"
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
                              <View
                                className="relative w-44 h-16 mobile:w-full"
                                key={key}
                              >
                                <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                  <Image
                                    source={require("@/assets/images/document.png")}
                                    className="w-6 h-10"
                                  />
                                  <Pressable
                                    className="overflow-hidden text-sm text-content break-all mobile:text-xs hover:text-customhover"
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
                                    {doc.docname}
                                  </Pressable>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      )}
                      <View className="flex items-center justify-between">
                        <View className="flex items-center space-x-5 tablet:space-x-3">
                          <View className="flex items-center space-x-1">
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
                                    : "white"
                                }
                                size={16}
                                name={"heart"}
                              />
                            </Pressable>
                            <Text>{item.likes?.length}</Text>
                          </View>
                          <Pressable
                            onPress={() => handleLikesFeed(item._id as string)}
                          >
                            <MaterialCommunityIcons
                              color={
                                item.likes &&
                                item.likes.filter((like) => like === user?._id)
                                  .length > 0
                                  ? "red"
                                  : "white"
                              }
                              size={16}
                              name={"heart"}
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
                                  color={"#4C4C4C"}
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
                                  color={"#4C4C4C"}
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
                    <View className="flex space-x-5 tablet:space-x-3">
                      <View className="w-10 flex justify-center">
                        <View className="w-8 h-8 flex justify-center items-center bg-[#EFEFEF] rounded-full">
                          {/* <UserRound className="text-content" size={16} /> */}
                          <MaterialCommunityIcons
                            color={"#000000"}
                            size={16}
                            name={"account"}
                          />
                        </View>
                      </View>
                      <List.Section title="Accordions">
                        <List.Accordion
                          title="Uncontrolled Accordion"
                          left={(props) => (
                            <List.Icon {...props} icon="folder" />
                          )}
                        >
                          <List.Item title="First item" />
                          <List.Item title="Second item" />
                        </List.Accordion>

                        <List.Accordion
                          title={
                            <Text className="text-sm text-[#00A3FF] mobile:text-xs">
                              {commentsOpen[item._id as string]
                                ? `Kommentare ausblenden (${item.detail.length})`
                                : `Zeige alle Kommentare (${item.detail.length})`}
                            </Text>
                          }
                          left={(props) => (
                            <List.Icon {...props} icon="folder" />
                          )}
                          expanded={commentsOpen[item._id as string]}
                          onPress={() => handleCollapsible(item._id as string)}
                        >
                          <List.Item
                            title={item.detail.map((deatil, key) => {
                              return (
                                <View
                                  className="flex space-x-5 tablet:space-x-3"
                                  key={key}
                                >
                                  <View className="w-10 h-10">
                                    <Image
                                      source={UPLOAD_URI + deatil.user?.avatar}
                                      className="w-10 h-10"
                                    />
                                    <Avatar.Text
                                      label={
                                        getAvatarLetters(
                                          deatil.user?.username
                                        ) || ""
                                      }
                                      className="text-white bg-custom"
                                    />
                                  </View>
                                  <View className="w-full  space-y-3">
                                    <View className="flex space-x-3 tablet:flex-col tablet:space-x-0">
                                      <Text className="font-bold">
                                        {deatil.user?.username}
                                      </Text>
                                      <View className="flex items-center space-x-2 mobile:space-x-1">
                                        <Text className="text-sm text-content">
                                          {deatil.user?.alias
                                            ? deatil.user.alias
                                            : "@username"}
                                        </Text>
                                        <View className="w-[3px] h-[3px] bg-content rounded-full" />
                                        <Text className="text-xs text-content">
                                          {getTimeDifferenceInGerman(
                                            deatil.date as string
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                    <RenderHTML
                                      contentWidth={width}
                                      source={{
                                        html: item.content || "",
                                      }}
                                      defaultTextProps={{
                                        selectable: true,
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
                                    {deatil.images &&
                                      deatil.images.length > 0 && (
                                        <View className=" space-y-3">
                                          {deatil.images.map((img, key) => {
                                            return (
                                              <View
                                                className="relative w-full h-32"
                                                key={key}
                                              >
                                                <Image
                                                  className="object-cover border border-[#F7F7F7] rounded-xl"
                                                  source={UPLOAD_URI + img}
                                                />
                                              </View>
                                            );
                                          })}
                                        </View>
                                      )}
                                    {deatil.documents &&
                                      deatil.documents.length > 0 && (
                                        <View className="flex flex-wrap gap-3">
                                          {deatil.documents.map((doc, key) => {
                                            return (
                                              <View
                                                className="relative w-44 h-16 mobile:w-full"
                                                key={key}
                                              >
                                                <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                                  <Image
                                                    source={require("@/assets/images/document.png")}
                                                    className="w-6 h-10"
                                                  />
                                                  <Pressable
                                                    className="overflow-hidden text-sm text-content break-all mobile:text-xs hover:text-customhover"
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
                          />
                        </List.Accordion>
                      </List.Section>
                    </View>
                  )}
                </View>
              );
            })}
            <Dialog visible={replyOpen} onDismiss={() => setReplyOpen(false)}>
              <Dialog.Content className="max-w-[544px] w-full gap-0 overflow-hidden p-0 rounded-3xl">
                <h1 className="text-sm font-semibold px-8 py-6 border-b tablet:px-4 tablet:py-3">
                  Kommentar schreiben
                </h1>
                <View className="max-h-[500px] overflow-y-auto  space-y-3 p-8 tablet:p-4">
                  <View className=" space-y-1">
                    <View className="flex space-x-3">
                      <View className=" items-center space-y-1">
                        <View className="w-8 h-8">
                          <Image
                            source={UPLOAD_URI + tempData?.user?.avatar}
                            className="w-10 h-10"
                          />
                          <Avatar.Text
                            label={
                              getAvatarLetters(tempData?.user?.username) || ""
                            }
                            className="text-sm text-white bg-custom"
                          />
                        </View>
                        <View className="w-[1px] h-full bg-[#ECECEC]" />
                      </View>
                      <View className="w-full  space-y-2">
                        <View className="flex space-x-3 tablet:flex-col tablet:space-x-0">
                          <Text className="text-sm font-bold">
                            {tempData?.user?.username}
                          </Text>
                          <View className="flex items-center space-x-1">
                            <Text className="text-sm text-content">
                              {tempData?.user?.alias
                                ? tempData.user.alias
                                : "@username"}
                            </Text>
                            <View className="w-[3px] h-[3px] bg-content rounded-full" />
                            <Text className="text-xs text-content">
                              {getTimeDifferenceInGerman(
                                tempData?.date as string
                              )}
                            </Text>
                          </View>
                        </View>

                        <RenderHTML
                          contentWidth={width}
                          source={{
                            html: tempData?.content || "",
                          }}
                          defaultTextProps={{
                            selectable: true,
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
                        <View className="flex items-center space-x-1 py-5 text-sm">
                          <Text className="text-content">Antworten auf</Text>
                          <Text className="text-[#00A3FF]">
                            {tempData?.user?.alias
                              ? tempData.user.alias
                              : "@username"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex items-center space-x-3">
                      <View className="w-8 h-8 flex justify-center items-center bg-[#EFEFEF] rounded-full">
                        <MaterialCommunityIcons
                          color={"#000000"}
                          size={16}
                          name={"account"}
                        />
                      </View>
                      <Text className="text-sm text-content mobile:text-xs">
                        Schreib deinen Kommentar
                      </Text>
                    </View>
                  </View>
                  <View className=" space-y-3">
                    {/* <CommunityTiptap
                          message={replyMessage}
                          setMessage={setReplyMessage}
                          documents={replyDocuments}
                          setDocuments={setReplyDocuments}
                          handleImages={handleReplyImages}
                          onSend={onReply}
                          imgsCount={replyImages.length}
                          docsCount={replyDocuments.length}
                          voteAvailable={false}
                        /> */}
                    {replyPreviewImages.length > 0 && (
                      <View className="flex flex-wrap gap-3">
                        {replyPreviewImages.map((item: any, key: string) => {
                          return (
                            <View
                              className="relative w-36 h-24 mobile:w-full"
                              key={key}
                            >
                              <Image
                                className="object-cover rounded-xl"
                                source={item.src}
                                alt="preview"
                              />
                              <Pressable
                                className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                                onPress={() => handleReplyRemoveImg(item.name)}
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
                            <View
                              className="relative w-36 h-14 mobile:w-full"
                              key={key}
                            >
                              <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                <Image
                                  source={require("@/assets/images/document.png")}
                                  className="w-6 h-10"
                                />
                                <Text
                                  className="overflow-hidden text-sm text-content break-all mobile:text-xs"
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
                                className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                                onPress={() => handleReplyRemoveDoc(item?.name)}
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
                </View>
              </Dialog.Content>
            </Dialog>
            <Dialog visible={editOpen} onDismiss={() => setEditOpen(false)}>
              <Dialog.Content className="max-w-[544px] w-full gap-0 overflow-hidden p-0 rounded-3xl">
                <h1 className="text-sm font-semibold px-8 py-6 border-b tablet:px-4 tablet:py-3">
                  Feed bearbeiten
                </h1>
                <View className="max-h-[500px] overflow-y-auto  space-y-3 p-8 tablet:p-4">
                  <View className="flex space-x-3">
                    <View className="w-8 h-8">
                      <Image
                        source={UPLOAD_URI + tempEditData?.user?.avatar}
                        className="w-10 h-10"
                      />
                      <Avatar.Text
                        label={
                          getAvatarLetters(tempEditData?.user?.username) || ""
                        }
                        className="text-sm text-white bg-custom"
                      />
                    </View>
                    <View className="w-full  space-y-3">
                      <View className="flex space-x-3 tablet:flex-col tablet:space-x-0">
                        <Text className="text-sm font-bold">
                          {tempEditData?.user?.username}
                        </Text>
                        <View className="flex items-center space-x-1">
                          <Text className="text-sm text-content">
                            {tempEditData?.user?.alias
                              ? tempEditData.user.alias
                              : "@username"}
                          </Text>
                          <View className="w-[3px] h-[3px] bg-content rounded-full" />
                          <Text className="text-xs text-content">
                            {getTimeDifferenceInGerman(
                              tempEditData?.date as string
                            )}
                          </Text>
                        </View>
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
                                visibleEmoji ? "#19A873" : "#FFFFFF"
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
                          }}
                          initialContentHTML=""
                          initialFocus
                          // scrollEnabled
                        />
                      </View>
                      {updateVotes.length > 0 && (
                        <View className=" space-y-3">
                          {updateVotes.map((item: any, key: string) => {
                            return (
                              <View
                                className="flex items-center space-x-3"
                                key={key}
                              >
                                <TextInput
                                  className="max-w-md w-full"
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
                            className="w-fit text-custom text-sm cursor-pointer hover:text-customhover"
                            onPress={() =>
                              setUpdateVotes([
                                ...updateVotes,
                                { id: Date.now(), value: "" },
                              ])
                            }
                          >
                            <Text>Abstimmung hinzufügen</Text>
                          </Pressable>
                        </View>
                      )}
                      <View className="flex flex-wrap gap-3">
                        {existImages.length > 0 &&
                          existImages.map((item: any, key: string) => {
                            return (
                              <View
                                className="relative w-36 h-24 mobile:w-full"
                                key={key}
                              >
                                <Image
                                  className="object-cover rounded-xl"
                                  source={(UPLOAD_URI as string) + item}
                                  alt="preview"
                                />
                                <Pressable
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                                  onPress={() => handleExistRemoveImg(item)}
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
                        {updatePreviewImages.length > 0 &&
                          updatePreviewImages.map((item: any, key: string) => {
                            return (
                              <View
                                className="relative w-36 h-24 mobile:w-full"
                                key={key}
                              >
                                <Image
                                  className="object-cover rounded-xl"
                                  source={item.src}
                                />
                                <Pressable
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
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
                          })}
                      </View>
                      <View className="flex flex-wrap gap-3">
                        {existDocuments.map((item: any, key: string) => {
                          return (
                            <View
                              className="relative w-36 h-14 mobile:w-full"
                              key={key}
                            >
                              <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                <Image
                                  source={require("@/assets/images/document.png")}
                                  className="w-6 h-10"
                                />
                                <Text
                                  className="overflow-hidden text-sm text-content break-all mobile:text-xs"
                                  // style={{
                                  //   display: "-webkit-box",
                                  //   WebkitLineClamp: 1,
                                  //   WebkitBoxOrient: "vertical",
                                  // }}
                                >
                                  {item.docname}
                                </Text>
                              </View>
                              <Pressable
                                className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
                                onPress={() =>
                                  handleExistRemoveDoc(item.source)
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
                        {updateDocuments.length > 0 &&
                          updateDocuments.map((item: any, key: string) => {
                            return (
                              <View
                                className="relative w-36 h-14 mobile:w-full"
                                key={key}
                              >
                                <View className="w-full h-full flex justify-center items-center space-x-3 px-3 bg-[#F7F7F7] rounded-xl">
                                  <Image
                                    source={require("@/assets/images/document.png")}
                                    className="w-6 h-10"
                                  />
                                  <Text
                                    className="overflow-hidden text-sm text-content break-all mobile:text-xs"
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
                                  className="absolute -top-2 -right-2 p-1 rounded-full z-10 cursor-pointer hover:bg-content"
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
                </View>
              </Dialog.Content>
            </Dialog>
          </View>
        )}
      </View>
    </View>
  );
};

export default CommunityFeedPage;
