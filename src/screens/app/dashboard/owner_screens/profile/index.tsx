import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import QRCode from "react-qr-code";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppSelector } from "@/store/hook";
import Container from "@/components/Container";
import { Text } from "react-native-paper";

const ProfileScreen: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return null;

  const redirectPersonalProfile = () => {
    router.push("./profile/personal");
  };

  return (
    <Container>
      <View className="px-5">
        {user.club && (
          <View className="flex flex-col items-center bg-white rounded-2xl mb-4 py-8">
            <QRCode
              size={120}
              style={{ height: "auto", maxWidth: 50, width: 50 }}
              value={"sdfsdfsdf"}
              viewBox={`0 0 256 256`}
            />
          </View>
        )}
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex flex-col justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-2">
              <FontAwesome name="user" color={"#8E8E8E"} size={32} />
            </View>
            <Text variant="titleMedium">{user.username}</Text>
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              {user.email}
            </Text>
          </View>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
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
            onPress={redirectPersonalProfile}
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
            onPress={redirectPersonalProfile}
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
