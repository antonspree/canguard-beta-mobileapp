import React from "react";
import { ImageBackground, Pressable, View } from "react-native";
import { router } from "expo-router";
import QRCode from "react-qr-code";
import { Text } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "@/store/hook";
import Container from "@/components/Container";
import { Image } from "expo-image";
import { UPLOAD_URI } from "@/config/env";
import LogoImg from "@/assets/images/icon.svg";
import MockCardBg from "@/assets/images/card-logo.svg";

const ProfileScreen: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);
  const { club } = useAppSelector((store) => store.club);

  if (!user) return null;

  const redirectPersonalProfile = () => {
    if (user.club) {
      router.push("/(app)/(dashboard)/profile/personal");
    } else {
      router.push("/(app)/(noclub)/profile/personal");
    }
  };

  const redirectBooking = () => {
    if (user.club) {
      router.push("/(app)/(dashboard)/profile/booking");
    } else {
      router.push("/(app)/(noclub)/profile/booking");
    }
  };

  const redirectMemberShip = () => {
    if (user.club) {
      router.push("/(app)/(dashboard)/profile/membership");
    } else {
      router.push("/(app)/(noclub)/profile/membership");
    }
  };

  const redirectNotification = () => {
    if (user.club) {
      router.push("/(app)/(dashboard)/profile/notification");
    } else {
      router.push("/(app)/(noclub)/profile/notification");
    }
  };

  return (
    <Container>
      <View className="px-5">
        {user.club && (
          <ImageBackground
            className="relative flex flex-col items-center bg-[#0C0C0C] rounded-2xl mb-4 overflow-hidden pt-[55%]"
            source={{
              uri: club?.badge ? UPLOAD_URI + club?.badge : undefined,
            }}
          >
            <Image
              source={MockCardBg}
              className="absolute -right-20 -bottom-16 w-full h-auto min-w-[370px] min-h-[210px]"
              style={{
                objectFit: "scale-down",
              }}
              contentFit="contain"
            />
            <View className="absolute top-4 right-4 flex-row items-center gap-1">
              <View className="w-2 h-4 items-center justify-center">
                <Image source={LogoImg} className="w-12 h-12" />
              </View>
              <Text variant="bodySmall" className="font-bold text-[#19A873]">
                Canify
              </Text>
            </View>
            <View className="absolute left-0 bottom-4 w-full flex-row justify-between px-4">
              <View>
                <Text className="text-[#ffffff] mb-0.5">{user.username}</Text>
                <Text variant="bodySmall" className="text-gray-400 mb-1.5">
                  {user.alias}
                </Text>
                <Text variant="bodySmall" className="text-gray-400">
                  {`${club?.clubID}-${user.memberID}`}
                </Text>
              </View>
              <View className="border border-white">
                <QRCode
                  size={60}
                  style={{
                    height: "auto",
                    backgroundColor: "#ffffff",
                  }}
                  value={`${club?.clubID}-${user.memberID}`}
                  viewBox={`0 0 256 256`}
                />
              </View>
            </View>
          </ImageBackground>
        )}
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex-col justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-2 overflow-hidden">
              {user.avatar ? (
                <Image
                  source={UPLOAD_URI + user.avatar}
                  className="w-20 h-20"
                />
              ) : (
                <FontAwesome name="user" color={"#8E8E8E"} size={32} />
              )}
            </View>
            <Text variant="titleMedium">{user.username}</Text>
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              {user.email}
            </Text>
          </View>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
            onPress={redirectBooking}
          >
            <MaterialCommunityIcons
              color={"#8E8E8E"}
              size={12}
              name={"card-bulleted-outline"}
            />
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Buchungen
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
            onPress={redirectMemberShip}
          >
            <MaterialCommunityIcons
              color={"#8E8E8E"}
              size={12}
              name={"ticket-confirmation-outline"}
            />
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Mitgliedschaft
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
            onPress={redirectPersonalProfile}
          >
            <MaterialCommunityIcons
              color={"#8E8E8E"}
              size={12}
              name={"account-outline"}
            />
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Profil bearbeiten
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3"
            onPress={redirectNotification}
          >
            <MaterialCommunityIcons
              color={"#8E8E8E"}
              size={12}
              name={"bell-outline"}
            />
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Benachrichtigungen
            </Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
