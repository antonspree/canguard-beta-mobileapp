import React from "react";
import Text from "@/elements/Text";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { View, Pressable } from "react-native";

const LogoImg = require("@/assets/images/logo.png");

const DashboardHeader: React.FC = () => {
  return (
    <View className="absolute top-0 left-0 z-10 flex flex-row items-center justify-between px-5 h-20 w-full bg-white border-b border-gray-100">
      <View className="flex flex-row items-center space-x-2">
        <Image className="w-6 h-6" placeholder="background" source={LogoImg} />
        <Text className="font-bold">CANIFY</Text>
      </View>
      <Pressable className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
        <User size={18} color={"black"} />
      </Pressable>
    </View>
  );
};

export default DashboardHeader;
