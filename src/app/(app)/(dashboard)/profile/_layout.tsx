import * as React from "react";
import { Stack, router } from "expo-router";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppSelector } from "@/store/hook";
import Text from "@/elements/Text";

const ProfileHeader = () => {
  const { user } = useAppSelector((store) => store.user);

  const redirectToSetting = () => {
    if (user?.club) {
      router.push("/(app)/(dashboard)/profile/personal");
    } else {
      router.push("/(app)/(noclub)/profile/personal");
    }
  };

  return (
    <View className="flex-row items-center justify-between h-[74px] border-b border-[#EAEAEA] px-3">
      <IconButton
        icon="cog"
        mode="contained"
        size={12}
        className="bg-[#EFEFEF]"
        iconColor="#5C5C5C"
        onPress={redirectToSetting}
      />
      <View className="flex-1 flex-row justify-center mr-10">
        <Text variant="titleMedium">Profil</Text>
      </View>
    </View>
  );
};

const PersonalHeader = () => {
  const onHandleBack = () => {
    router.back();
  };
  return (
    <View className="flex-row items-center justify-between h-[74px] border-b border-[#EAEAEA] px-4">
      <IconButton
        icon="chevron-left"
        mode="contained"
        size={12}
        className="bg-[#EFEFEF]"
        iconColor="#5C5C5C"
        onPress={onHandleBack}
      />
      <Text variant="titleMedium">Einstellungen</Text>
      <View className="w-6 h-6"></View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Profile", header: ProfileHeader }}
      />
      <Stack.Screen
        name="personal"
        options={{ title: "Einstellungen", header: PersonalHeader }}
      />
      <Stack.Screen name="booking" options={{ title: "Buchungen" }} />
      <Stack.Screen name="membership" options={{ title: "Mitgliedschaft" }} />
      <Stack.Screen
        name="notification"
        options={{ title: "Benachrichtigungen" }}
      />
    </Stack>
  );
}
