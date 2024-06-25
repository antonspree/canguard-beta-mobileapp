import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View, Text, Pressable } from "react-native";

const LogoImg = require("@/assets/images/logo.png");

const DashboardHeader: React.FC = () => {
  return (
    <View className="absolute top-0 left-0 z-10 flex flex-row items-center justify-between px-5 h-20 w-full bg-white border-b border-gray-100">
      <View className="flex flex-row items-center space-x-2">
        <Image className="w-6 h-6" placeholder="background" source={LogoImg} />
        <Text className="font-bold">CANGUARD</Text>
      </View>
      <Pressable>
        <FontAwesome size={18} name="bars" color={"black"} />
      </Pressable>
    </View>
  );
};

export default DashboardHeader;
