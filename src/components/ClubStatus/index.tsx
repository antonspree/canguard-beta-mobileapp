import React from "react";
import { View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ClubStatusPropsInterface } from "@/types/component";
import Text from "@/elements/Text";

const ClubStatus: React.FC<ClubStatusPropsInterface> = ({
  done,
  title,
  content,
}) => {
  return (
    <View className="flex flex-row items-center space-x-3">
      {done ? (
        <Feather name="check-circle" size={24} color="#19A873" />
      ) : (
        <FontAwesome name="circle-thin" size={24} color="#19A873" />
      )}
      <View className="flex flex-col space-y-1">
        <Text className="text-sm font-medium">{title}</Text>
        <Text className="text-xs text-[#919191]">{content}</Text>
      </View>
    </View>
  );
};

export default ClubStatus;
