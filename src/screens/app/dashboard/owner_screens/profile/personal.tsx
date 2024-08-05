import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { clearData } from "@/lib/storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Container from "@/components/Container";

const PersonalDetailScreen: React.FC = () => {
  const handleLogout = () => {
    clearData("token");
    router.push("/(guest)/login");
  };

  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Mein Account
          </Text>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
            onPress={() => router.push("/profile/resetpassword")}
          >
            <Feather name="mail" size={16} color="8E8E8E" />
            <Text className="text-[#8E8E8E]">E-Mail / Passwort ändern</Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3"
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={16} color="8E8E8E" />
            <Text className="text-[#8E8E8E]">Logout</Text>
          </Pressable>
        </View>
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Feedback & Kontakt
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <Feather name="send" size={16} color="8E8E8E" />
            <Text className="text-[#8E8E8E]">Fehler melden</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <MaterialCommunityIcons
              name="cursor-default-click-outline"
              size={16}
              color="#8E8E8E"
            />
            <Text className="text-[#8E8E8E]">Support kontaktieren</Text>
          </Pressable>
        </View>
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Rechtliches
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <Feather name="external-link" size={16} color="#8E8E8E" />
            <Text className="text-[#8E8E8E]">Datenschutzerklärung</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <Feather name="external-link" size={16} color="#8E8E8E" />
            <Text className="text-[#8E8E8E]">Impressum</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <Feather name="external-link" size={16} color="#8E8E8E" />
            <Text className="text-[#8E8E8E]">AGB</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default PersonalDetailScreen;
