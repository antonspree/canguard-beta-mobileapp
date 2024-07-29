import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailContainerProps } from "@/types/component";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const DetailContainer: React.FC<DetailContainerProps> = ({
  children = <></>,
  title,
  backLink,
}) => {
  return (
    <SafeAreaView className="h-full w-full mx-auto bg-white">
      <View className="flex flex-row items-center justify-between px-5 space-x-2">
        <Text className="font-bold text-lg text-gray-500">{title}</Text>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => backLink && router.push(backLink)}
        >
          <MaterialCommunityIcons
            color={"#f9fafb"}
            size={24}
            name={"chevron-left"}
          />
          <Text className="text-gray-500 uppercase">Back</Text>
        </Pressable>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default DetailContainer;
