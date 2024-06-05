import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { ClubCardPropsInterface } from "@/types/component";

const ClubCard: React.FC<ClubCardPropsInterface> = ({
  title,
  icon,
  content,
  btnIcon,
  btnText,
  route,
}) => {
  return (
    <View className="flex flex-col space-y-3 mt-5 p-5 border border-[#EAEAEA] rounded-md">
      <View className="flex flex-col space-y-2">
        {icon}
        <Text className="text-xl font-semibold">{title}</Text>
        <Text className="text-sm text-[#919191]">{content}</Text>
      </View>
      <Pressable
        className="w-[150px] flex flex-row items-center space-x-2 px-4 py-2 bg-[#19A873] rounded-md"
        onPress={() => router.push(route)}
      >
        {btnIcon}
        <Text className="text-sm text-white">{btnText}</Text>
      </Pressable>
    </View>
  );
};

export default ClubCard;
