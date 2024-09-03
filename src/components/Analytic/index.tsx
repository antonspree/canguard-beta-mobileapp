import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { AnalyticPropsInterface } from "@/types/component";
import Card from "../Card";
import Text from "@/elements/Text";
import { useTheme } from "@/hooks/useThemeProvider";

const Analytic: React.FC<AnalyticPropsInterface> = ({
  title,
  content,
  info,
  icon,
  isComingSoon = false,
}) => {
  const { colors } = useTheme();

  return (
    <Card>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text variant="bodyMedium" style={tw`font-bold`}>
          {title}
        </Text>
        {icon}
      </View>
      <View style={tw`mt-4 mb-2`}>
        {isComingSoon ? (
          <View style={tw`flex-row`}>
            <View
              style={tw`flex-row items-center gap-1 px-1.5 py-1 bg-[${colors.bgColor}] bg-opacity-25 border border-transparent rounded-md`}
            >
              <MaterialCommunityIcons
                name="party-popper"
                size={16}
                color={colors.bgColor}
              />
              <Text
                variant="bodyMedium"
                style={tw`text-xs text-[${colors.bgColor}]`}
              >
                Neue Features
              </Text>
            </View>
          </View>
        ) : (
          <>
            <Text style={tw`text-lg`}>{content}</Text>
            {info && <Text style={tw`text-xs text-[#919191]`}>{info}</Text>}
          </>
        )}
      </View>
    </Card>
  );
};

export default Analytic;
