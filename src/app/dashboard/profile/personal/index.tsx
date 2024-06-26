import { Container } from "@/components";
import { clearData } from "@/lib/storage";
import { router } from "expo-router";
import {
  ExternalLink,
  LogOut,
  Mail,
  MousePointerClick,
  Send,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const Profile: React.FC = () => {
  const handleLogout = () => {
    clearData("token");
    router.push("/guest/login");
  };

  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Mein Account
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100" onPress={() => router.push("/profile/resetpassword")}>
            <Mail size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">E-Mail / Passwort ändern</Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3"
            onPress={handleLogout}
          >
            <LogOut size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Logout</Text>
          </Pressable>
        </View>
        <View className="bg-white rounded-3xl">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Feedback & Kontakt
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <Send size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Fehler melden</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <MousePointerClick size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Support kontaktieren</Text>
          </Pressable>
        </View>
        <View className="bg-white rounded-3xl mb-4">
          <Text className="font-semibold text-lg px-4 py-4 border-b border-gray-100">
            Rechtliches
          </Text>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <ExternalLink size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Datenschutzerklärung</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <ExternalLink size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Impressum</Text>
          </Pressable>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
            <ExternalLink size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">AGB</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Profile;
