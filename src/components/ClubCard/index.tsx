import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import Card from "../Card";
import { ClubCardPropsInterface } from "@/types/component";
import { Button } from "react-native-paper";
import Text from "@/elements/Text";

const ClubCard: React.FC<ClubCardPropsInterface> = ({
  title,
  icon,
  content,
  btnIcon,
  btnText,
  route,
  iconName,
}) => {
  return (
    <Card className="flex flex-col space-y-3">
      <View className="flex flex-col space-y-2">
        {icon}
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodySmall" className="text-[#919191]">
          {content}
        </Text>
      </View>
      {/* <Pressable
        className="w-[150px] flex flex-row justify-center items-center space-x-2 px-4 py-2 bg-[#19A873] rounded-md"
        onPress={() => router.push(route)}
      >
        {btnIcon}
        <Text className="text-xs text-white">{btnText}</Text>
      </Pressable> */}

      <Button
        mode="contained"
        buttonColor="#19A873"
        onPress={() => router.push(route)}
        className="w-[150px] rounded-md"
        icon={iconName}
      >
        <Text variant="titleSmall" className="text-white">
          {btnText}
        </Text>
      </Button>
    </Card>
  );
};

export default ClubCard;
