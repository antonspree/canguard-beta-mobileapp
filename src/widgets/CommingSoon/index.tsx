import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "@/components/Container";
import Text from "@/elements/Text";

const CommingSoon = () => {
  return (
    <Container>
      <View className="items-center justify-center space-y-1">
        <MaterialCommunityIcons
          name="clock-alert"
          size={24}
          color={"#19A873"}
        />
        <Text variant="bodyMedium" className="text-[#19A873]">
          Kommt bald
        </Text>
      </View>
    </Container>
  );
};

export default CommingSoon;
