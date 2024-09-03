import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useThemeProvider";
import Text from "@/elements/Text";
import { ClubStatusPropsInterface } from "@/types/component";

const ClubStatus: React.FC<ClubStatusPropsInterface> = ({
  done,
  title,
  content,
}) => {
  const { colors } = useTheme();

  return (
    <View style={tw`flex flex-row items-center gap-3`}>
      <View style={tw`flex items-center justify-center w-6 h-6`}>
        {done ? (
          <Feather name="check-circle" size={24} color={colors.bgColor} />
        ) : (
          <FontAwesome name="circle-thin" size={24} color={colors.bgColor} />
        )}
      </View>
      <View style={tw`flex flex-col gap-1`}>
        <Text style={tw`text-sm font-medium`}>{title}</Text>
        <Text style={tw`text-xs text-[#919191]`}>{content}</Text>
      </View>
    </View>
  );
};

export default ClubStatus;
