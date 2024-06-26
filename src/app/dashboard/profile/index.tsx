import { Pressable, View, Text } from "react-native";
import QRCode from "react-qr-code";
import { FontAwesome } from "@expo/vector-icons";
import { Container } from "@/components";
import { Ticket, UserRound } from "lucide-react-native";
import { useAppSelector } from "@/store/hook";
import { router } from "expo-router";

const Club: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return null;

  const redirectPersonalProfile = () => {
    router.push("/dashboard/profile/personal");
  };

  return (
    <Container>
      <View className="px-5">
        <View className="flex flex-col items-center bg-white rounded-3xl mb-4 py-8">
          <QRCode
            size={120}
            style={{ height: "auto", maxWidth: 50, width: 50 }}
            value={"sdfsdfsdf"}
            viewBox={`0 0 256 256`}
          />
        </View>
        <View className="bg-white rounded-3xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex flex-col justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-2">
              <FontAwesome name="user" color={"#8E8E8E"} size={32} />
            </View>
            <Text className="font-bold text-lg">{user.username}</Text>
            <Text className="text-xs text-[#8E8E8E]">{user.email}</Text>
          </View>
          <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
            <Ticket size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Mitgliedschaft</Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center space-x-2 px-4 py-3"
            onPress={redirectPersonalProfile}
          >
            <UserRound size={16} color={"#8E8E8E"} />
            <Text className="text-[#8E8E8E]">Profil bearbeiten</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Club;
