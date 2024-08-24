import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AnalyticPropsInterface } from "@/types/component";
import Card from "../Card";
import Text from "@/elements/Text";

const Analytic: React.FC<AnalyticPropsInterface> = ({
  title,
  content,
  info,
  icon,
  isComingSoon = false,
}) => {
  return (
    <Card>
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold">{title}</Text>
        {icon}
      </View>
      <View className="mt-4 mb-2">
        {isComingSoon ? (
          <View className="w-[130px] inline-flex flex-row items-center space-x-2 p-1 bg-[#DDF2EA] border border-transparent rounded-md">
            <MaterialCommunityIcons
              name="party-popper"
              size={16}
              color="#19A873"
            />
            <Text className="text-xs text-[#19A873] font-medium">
              Neue Features
            </Text>
          </View>
        ) : (
          <>
            <Text className="text-lg">{content}</Text>
            {info && <Text className="text-xs text-[#919191]">{info}</Text>}
          </>
        )}
      </View>
    </Card>
  );
};

export default Analytic;
