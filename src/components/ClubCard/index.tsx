import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import Card from "../Card";
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
    <Card className="flex flex-col space-y-3">
      <View className="flex flex-col space-y-2">
        {icon}
        <Text className="text-base font-semibold">{title}</Text>
        <Text className="text-xs text-[#919191]">{content}</Text>
      </View>
      <Pressable
        className="w-[150px] flex flex-row justify-center items-center space-x-2 px-4 py-2 bg-[#19A873] rounded-md"
        onPress={() => router.push(route)}
      >
        {btnIcon}
        <Text className="text-xs text-white">{btnText}</Text>
      </Pressable>
    </Card>
  );
};

export default ClubCard;
