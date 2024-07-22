import DetailContainer from "@/components/DetailContainer";
import {
  Club,
  Heart,
  LayoutPanelLeft,
  MessageCircle,
  ShieldCheckIcon,
  User,
  Users,
} from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

export default function CommFeed() {
  return (
    <DetailContainer title="Community" backLink="/dashboard">
      <View className="flex-row px-5 py-3 space-x-2">
        <Pressable className="flex-row items-center">
          <Users className="mr-1" color={"#000000"} size={16} />
          <Text>Feed</Text>
        </Pressable>
        <Pressable className="flex-row items-center">
          <LayoutPanelLeft className="mr-1" color={"#000000"} size={16} />
          <Text>Profil</Text>
        </Pressable>
        <Pressable className="flex-row items-center">
          <Club className="mr-1" color={"#000000"} size={16} />
          <Text>Club</Text>
        </Pressable>
        <Pressable className="flex-row items-center">
          <ShieldCheckIcon className="mr-1" color={"#000000"} size={16} />
          <Text>Following</Text>
        </Pressable>
      </View>
      <View className="flex px-5 py-3 space-x-2">
        <View>
          <TextInput
            placeholder="Was gibt es Neues?"
            className="bg-gray-50 rounded-3xl px-4 py-3 mb-5"
          />
        </View>
        <View>
          <View>
            <View className="flex-row space-x-2">
              <View className="flex-row space-x-2">
                <View>
                  <User color={"#000000"} size={16} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-lg">Anton Spreemann</Text>
                  <Text className="text-xs ext-[#BDBDBD]">@username</Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#BDBDBD]">
                  vor ungefähr 2 Stunden
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row space-x-2">
                <View className="flex-row space-x-1">
                  <Heart color={"#FF0000"} size={16} />
                  <Text>32</Text>
                </View>
                <View className="space-x-1">
                  <MessageCircle color={"#000000"} size={16} />
                </View>
              </View>
            </View>
            <View>
              <View>
                <User color={"#000000"} size={16} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </DetailContainer>
  );
}
