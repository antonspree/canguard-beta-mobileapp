import React from "react";
import { Pressable, View, Text } from "react-native";
import Container from "@/components/Container";
import { useAppSelector } from "@/store/hook";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ClubScreen: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return null;

  return (
    <Container>
      <View className="px-5">
        <View className="space-y-2 mb-4 py-8">
          <View className="flex-row space-x-2">
            <Pressable className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <MaterialCommunityIcons
                color={"#000000"}
                size={24}
                name={"account-multiple"}
              />
              <Text>Mitglieder</Text>
            </Pressable>
            <Pressable className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <MaterialCommunityIcons
                color={"#000000"}
                size={24}
                name={"cog"}
              />
              <Text>Einstellungen</Text>
            </Pressable>
          </View>
          <View className="flex-row space-x-2">
            <Pressable className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <MaterialCommunityIcons
                color={"#000000"}
                size={24}
                name={"account-group"}
              />
              <Text>Academy</Text>
            </Pressable>
            <Pressable className="w-[50%] flex-1 flex-row justify-center items-center space-x-2 px-4 py-4 bg-white rounded-xl border border-[#EFEFEF]">
              <MaterialCommunityIcons
                color={"#000000"}
                size={24}
                name={"search-web"}
              />
              <Text>Clubsuche</Text>
            </Pressable>
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

export default ClubScreen;
