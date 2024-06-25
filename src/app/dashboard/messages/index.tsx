import { Container } from "@/components";
import { Plus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const Chat: React.FC = () => {
  return (
    <Container>
      <View className="px-5 mb-4">
        <Pressable className="flex flex-row items-center space-x-1 bg-white w-[150px] px-5 py-1 border border-gray-100 rounded-full">
          <Plus color={"#000000"} size={12} />
          <Text className="text-xs">Chat erstellen</Text>
        </Pressable>
      </View>
      <View className="px-5">
        <Pressable className="flex flex-row items-center space-x-3 border-b border-gray-100 px-4 py-2">
          <Text className="text-2xl">#</Text>
          <View>
            <Text className="font-semibold">Allgemein</Text>
            <View className="flex flex-row">
              <Text className="text-[10px]">Anton Spreemann: </Text>
              <Text className="text-[10px] text-gray-500">Hallo</Text>
            </View>
          </View>
        </Pressable>
        <Pressable className="flex flex-row items-center space-x-3 border-b border-gray-100 px-4 py-2">
          <Text className="text-2xl">#</Text>
          <View>
            <Text className="font-semibold">Grow</Text>
            <View className="flex flex-row">
              <Text className="text-[10px]">Anton Spreemann: </Text>
              <Text className="text-[10px] text-gray-500">Wie gehts?</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Container>
  );
};

export default Chat;
