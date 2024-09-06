import * as React from "react";
import { View } from "react-native";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/hooks/useThemeProvider";
import Text from "@/elements/Text";
import Container from "@/components/Container";

const CommingSoon = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <View className="w-[130px] m-auto inline-flex flex-row items-center space-x-2 p-1 bg-[#DDF2EA] border border-transparent rounded-md">
        <MaterialCommunityIcons
          name="party-popper"
          size={16}
          color={colors.bgColor}
        />
        <Text style={tw`text-xs text-[${colors.bgColor}] font-medium`}>
          Neue Features
        </Text>
      </View>
    </Container>
  );
};

export default CommingSoon;
