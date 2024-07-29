import Container from "@/components/Container";
import React from "react";
import { View, Text } from "react-native";

const Documents = () => {
  return (
    <Container>
      <View className="bg-white rounded-3xl mb-4">
        <View className="py-2 px-3 border-b border-gray-100">
          <Text>Here you can customize your club according to your needs</Text>
        </View>
        <View className="py-2 px-3">
          <View>
            <Text className="font-semibold">Banners & Avatars</Text>
            <Text className="text-[#808089]">
              Choose a banner and an avatar for your club. The optimal format of
              the banner is 16:5 (eg 1600x500px). The avatar should be square
              (eg 500x500px). The images will be displayed in the club search,
              among other places.
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Documents;
