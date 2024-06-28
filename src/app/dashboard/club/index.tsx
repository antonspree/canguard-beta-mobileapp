import { Pressable, View, Text } from "react-native";
import QRCode from "react-qr-code";
import { FontAwesome } from "@expo/vector-icons";
import { Container } from "@/components";
import { Group, Search, Settings, Ticket, UserRound, UsersRound } from "lucide-react-native";
import { useAppSelector } from "@/store/hook";

const Club: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return null;

  return (
    <Container>
      <View className="px-5">
        <View className="space-y-2 mb-4 py-8">
          <View className="flex-row space-x-2">
            <View className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <Group color={"#000"} />
              <Text>Mitglieder</Text>
            </View>
            <View className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <Settings color={"#000"} />
              <Text>Einstellungen</Text>
            </View>
          </View>
          <View className="flex-row space-x-2">
            <View className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <Group color={"#000"} />
              <Text>Academy</Text>
            </View>
            <View className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <Search color={"#000"} />
              <Text>Clubsuche</Text>
            </View>
          </View>
        </View>
        <View className="bg-white rounded-3xl mb-4">
          <View className="rounded-3xl overflow-hidden">
            <View className="bg-black pt-[25%]"></View>
            <View className="flex-row justify-start">
              <View className="w-fit p-4 inline-block">
                <Text className="font-bold text-2xl">Test 1</Text>
                <View className="bg-[#EEEEEE] rounded-md p-1">
                  <Text className="text-[10px] text-[#545454]">
                    0/500 Mitglieder
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Club;
