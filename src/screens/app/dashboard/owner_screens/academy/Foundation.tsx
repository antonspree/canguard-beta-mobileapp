import React from "react";
import { View } from "react-native";
import Container from "@/components/Container";
import Text from "@/elements/Text";

const FoundationScreen = () => {
  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text variant="titleSmall" className="mb-2">
              Founding your Cannabis Social Club
            </Text>
            <Text variant="bodySmall" className="text-[#8E8E8E]">
              Welcome to Chapter 1 of our CanSult Academy, where you can expect
              new videos every week on the topic of founding a company and the
              first steps in your cannabis social club.
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="w-28 h-20 bg-gray-200 rounded-lg mb-4"></View>
            <View>
              <Text>Welcome to CanSult Academy</Text>
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                We are pleased to finally present our CanSult Academy to you.
                Good luck!
              </Text>
            </View>
          </View>
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="w-28 h-20 bg-gray-200 rounded-lg mb-4"></View>
            <View>
              <Text>Establishment of an eV</Text>
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                The basic requirement for your cannabis social club is to be a
                registered association. Lennart tells you what you need to pay
                attention to.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default FoundationScreen;
