import React from "react";
import { Pressable, Text, View } from "react-native";
import Container from "@/components/Container";

const GeneralScreen = () => {
  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-xl mb-4">
          <View className="py-3 px-3 border-b border-gray-100">
            <Text className="text-[#808089] text-[10px] leading-4">
              Define general settings for your club. Once saved, they will be
              activated for all new members.
            </Text>
          </View>
          <View className="py-3 px-3">
            <View className="flex flex-row items-center mb-4">
              <View>
                <Text>Allow member requests</Text>
                <Text>This allows users to send requests to your club.</Text>
              </View>
              <View className="w-8 h-5 bg-red rounded-full"></View>
            </View>
            <View className="flex flex-row items-center mb-4">
              <View>
                <Text>Allow member requests</Text>
                <Text>This allows users to send requests to your club.</Text>
              </View>
              <View className="w-8 h-5 bg-red rounded-full"></View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default GeneralScreen;
