import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { joinClub } from "@/actions/club";
import message from "@/lib/message";
import { isEmpty } from "@/lib/function";
import { cn } from "@/lib/utils";
import { UPLOAD_URI } from "@/config/env";
import { ClubPropsInterface } from "@/types/component";

const Club: React.FC<ClubPropsInterface> = ({
  clubname,
  badge,
  avatar,
  users,
  maxUser,
  description,
  email,
  phone,
  website,
  instagram,
  discord,
  facebook,
  youtube,
  clubID,
  allowRequest,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleJoinClub = async () => {
    const result = await joinClub({ clubID: clubID });

    message({ message: result.msg });

    setOpen(false);

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));
      dispatch(clubActions.setClub({ club: result.club }));
      dispatch(membersActions.setMembers({ members: result.members }));

      router.replace("/(main)/home");
    }
  };

  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <>
      <View className="w-full overflow-hidden border border-[#EAEAEA] rounded-md">
        <View className="h-[100px] bg-[#EAEAEA]">
          {badge === undefined ? (
            <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8]">
              <FontAwesome name="home" size={32} color="#5E5E5E" />
            </View>
          ) : (
            <Image
              className="w-full h-full"
              placeholder="badge"
              source={{ uri: UPLOAD_URI + badge }}
            />
          )}
        </View>
        <View className="relative bg-white">
          <View className="absolute -top-7 left-7 w-14 h-14">
            {avatar === undefined ? (
              <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] border-2 border-white rounded-full">
                <FontAwesome name="home" size={24} color="#5E5E5E" />
              </View>
            ) : (
              <Image
                className="w-full h-full border-2 border-white rounded-full"
                contentFit="fill"
                placeholder="avatar"
                source={{ uri: UPLOAD_URI + avatar }}
              />
            )}
          </View>
          <View className="space-y-2 p-5 pt-7">
            <Pressable onPress={() => setOpen(true)}>
              <Text className="font-bold text-base">{clubname}</Text>
            </Pressable>
            <View className="flex flex-row space-x-5">
              <View className="inline-flex items-center p-1 bg-[#F4F4F5] border border-transparent rounded-md">
                <Text className="text-xs font-semibold text-[#18181B]">
                  {users}/{maxUser} Mitglieder
                </Text>
              </View>
              <View className="flex flex-row space-x-2 items-center">
                {email && (
                  <Pressable onPress={() => handlePress(email)}>
                    <MaterialCommunityIcons
                      name="gmail"
                      size={20}
                      color="#5E5E5E"
                    />
                  </Pressable>
                )}
                {phone && (
                  <Pressable onPress={() => handlePress(phone)}>
                    <FontAwesome name="phone" size={20} color="#5E5E5E" />
                  </Pressable>
                )}
                {website && (
                  <Pressable onPress={() => handlePress(website)}>
                    <FontAwesome name="globe" size={20} color="#5E5E5E" />
                  </Pressable>
                )}
                {instagram && (
                  <Pressable onPress={() => handlePress(instagram)}>
                    <FontAwesome name="instagram" size={20} color="#5E5E5E" />
                  </Pressable>
                )}
                {discord && (
                  <Pressable onPress={() => handlePress(discord)}>
                    <MaterialCommunityIcons
                      name="discord"
                      size={20}
                      color="#5E5E5E"
                    />
                  </Pressable>
                )}
                {facebook && (
                  <Pressable onPress={() => handlePress(facebook)}>
                    <FontAwesome
                      name="facebook-square"
                      size={20}
                      color="#5E5E5E"
                    />
                  </Pressable>
                )}
                {youtube && (
                  <Pressable onPress={() => handlePress(youtube)}>
                    <FontAwesome
                      name="youtube-play"
                      size={20}
                      color="#5E5E5E"
                    />
                  </Pressable>
                )}
              </View>
            </View>
            <Text
              className="overflow-hidden text-sm text-[#919191] text-ellipsis"
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View className="flex flex-col">
          <Pressable
            className="w-full h-1/2 bg-black/50"
            onPress={() => setOpen(false)}
          />
          <View className="w-full h-1/2 overflow-hidden flex justify-center items-center p-3 bg-white">
            <View className="w-full overflow-hidden border border-[#EAEAEA] rounded-md">
              <View className="h-[100px] bg-[#EAEAEA]">
                {badge === undefined ? (
                  <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8]">
                    <FontAwesome name="home" size={32} color="#5E5E5E" />
                  </View>
                ) : (
                  <Image
                    className="w-full h-full"
                    placeholder="badge"
                    source={{ uri: UPLOAD_URI + badge }}
                  />
                )}
              </View>
              <View className="relative w-full bg-white">
                <View className="absolute -top-7 left-7 w-14 h-14">
                  {avatar === undefined ? (
                    <View className="w-full h-full flex justify-center items-center bg-[#F8F8F8] border-2 border-white rounded-full">
                      <FontAwesome name="home" size={24} color="#5E5E5E" />
                    </View>
                  ) : (
                    <Image
                      className="w-full h-full border-2 border-white rounded-full"
                      contentFit="fill"
                      placeholder="avatar"
                      source={{ uri: UPLOAD_URI + avatar }}
                    />
                  )}
                </View>
                <View className="space-y-2 p-5 pt-7">
                  <Text className="font-bold text-base">{clubname}</Text>
                  <View className="flex flex-row space-x-5">
                    <View className="inline-flex items-center p-1 bg-[#F4F4F5] border border-transparent rounded-md">
                      <Text className="text-xs font-semibold text-[#18181B]">
                        {users}/{maxUser} Mitglieder
                      </Text>
                    </View>
                    <View className="flex flex-row space-x-2 items-center">
                      {email && (
                        <Pressable onPress={() => handlePress(email)}>
                          <MaterialCommunityIcons
                            name="gmail"
                            size={20}
                            color="#5E5E5E"
                          />
                        </Pressable>
                      )}
                      {phone && (
                        <Pressable onPress={() => handlePress(phone)}>
                          <FontAwesome name="phone" size={20} color="#5E5E5E" />
                        </Pressable>
                      )}
                      {website && (
                        <Pressable onPress={() => handlePress(website)}>
                          <FontAwesome name="globe" size={20} color="#5E5E5E" />
                        </Pressable>
                      )}
                      {instagram && (
                        <Pressable onPress={() => handlePress(instagram)}>
                          <FontAwesome
                            name="instagram"
                            size={20}
                            color="#5E5E5E"
                          />
                        </Pressable>
                      )}
                      {discord && (
                        <Pressable onPress={() => handlePress(discord)}>
                          <MaterialCommunityIcons
                            name="discord"
                            size={20}
                            color="#5E5E5E"
                          />
                        </Pressable>
                      )}
                      {facebook && (
                        <Pressable onPress={() => handlePress(facebook)}>
                          <FontAwesome
                            name="facebook-square"
                            size={20}
                            color="#5E5E5E"
                          />
                        </Pressable>
                      )}
                      {youtube && (
                        <Pressable onPress={() => handlePress(youtube)}>
                          <FontAwesome
                            name="youtube-play"
                            size={20}
                            color="#5E5E5E"
                          />
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <Text
                    className="overflow-hidden text-sm text-[#919191] text-ellipsis"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {description}
                  </Text>
                  {!isEmpty(user?.club) && (
                    <View className="flex flex-row space-x-2 p-2 bg-[#55A3FF]/20 border border-[#55A3FF] rounded-md">
                      <FontAwesome
                        name="info-circle"
                        size={16}
                        color="#55A3FF"
                      />
                      <View className="flex flex-col space-y-1.5">
                        <Text className="text-xs font-semibold text-[#3C699D]">
                          Du kannst dem Club nicht beitreten.
                        </Text>
                        <Text className="text-xs text-[#55A3FF]">
                          Du kannst nur in einem Club Mitglied sein.
                        </Text>
                      </View>
                    </View>
                  )}
                  <View className="flex flex-row justify-end space-x-2">
                    <Pressable
                      className="flex justify-center items-center p-2 border border-[#EAEAEA] rounded-md"
                      onPress={() => setOpen(false)}
                    >
                      <Text className="text-sm">Schließen</Text>
                    </Pressable>
                    <Pressable
                      className={cn(
                        "flex justify-center items-center px-4 py-2 border border-[#EAEAEA] rounded-md",
                        !isEmpty(user?.club) ||
                          maxUser === users ||
                          !allowRequest
                          ? "bg-[#919191]"
                          : "bg-black"
                      )}
                      onPress={handleJoinClub}
                      disabled={
                        !isEmpty(user?.club) ||
                        maxUser === users ||
                        !allowRequest
                      }
                    >
                      <Text className="text-sm text-white">Club beitreten</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Club;
