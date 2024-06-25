import { Container } from "@/components";
import { LogOut, Mail } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const Club: React.FC = () => {
  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Mein Account
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <Mail size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">E-Mail / Passwort ändern</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <LogOut size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Logout</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Club;
