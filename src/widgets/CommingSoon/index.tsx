import * as React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "@/components/Container";
import Text from "@/elements/Text";

const CommingSoon = () => {
  return (
    <Container>
      <View className="w-[130px] m-auto inline-flex flex-row items-center space-x-2 p-1 bg-[#DDF2EA] border border-transparent rounded-md">
        <MaterialCommunityIcons name="party-popper" size={16} color="#19A873" />
        <Text className="text-xs text-[#19A873] font-medium">
          Neue Features
        </Text>
      </View>
    </Container>
  );
};

export default CommingSoon;
