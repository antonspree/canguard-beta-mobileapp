import React from "react";
import { View } from "react-native";
import Text from "@/elements/Text";

const MemberRole = () => {
  return (
    <View>
      <View className="flex flex-col items-center bg-white rounded-3xl mb-4 py-8">
        <Text>E-Mail Einladung</Text>
        <Text>Neue Mitglieder einladen per E-Mail</Text>
      </View>
    </View>
  );
};

export default MemberRole;
