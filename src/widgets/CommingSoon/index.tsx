import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "@/components/Container";

const CommingSoon = () => {
  return (
    <Container>
      <View className="items-center space-y-1">
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
