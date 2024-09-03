import React from "react";
import { ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { useAppSelector } from "@/store/hook";
import Container from "@/components/Container";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Text from "@/elements/Text";

const ClubScreen: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);
  const { club } = useAppSelector((store) => store.club);

  if (!user || !club) return null;

  return (
    <Container>
      <View className="px-5">
        <View className="space-y-2 mb-5">
          <View className="flex-row space-x-2">
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/club/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"account-multiple"}
              textColor="#000000"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text>Mitglieder</Text>
            </Button>
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/club/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"cog"}
              textColor="#000000"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text>Einstellungen</Text>
            </Button>
          </View>
          <View className="flex-row space-x-2">
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/club/academy")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"school"}
              textColor="#000000"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text>Academy</Text>
            </Button>
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/club/search")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"search-web"}
              textColor="#000000"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text>Clubsuche</Text>
            </Button>
          </View>
        </View>
        <View className="bg-white rounded-2xl mb-2 overflow-hidden">
          <View className="overflow-hidden">
            <ImageBackground className="relative bg-[#EAEAEA] pt-[35%]">
              <View className="absolute top-0 left-0 bottom-0 right-0 justify-center items-center">
                <MaterialCommunityIcons
                  color={"#8E8E8E"}
                  size={32}
                  name={"home-outline"}
                />
              </View>
            </ImageBackground>
            <View className="justify-center items-center ml-4 -mt-9 w-16 h-16 bg-[#EAEAEA] rounded-full border-2 border-[#ffffff]">
              <MaterialCommunityIcons
                color={"#8E8E8E"}
                size={24}
                name={"home-outline"}
              />
            </View>
            <View className="flex-row justify-start">
              <View className="w-fit p-4 inline-block">
                <Text className="font-bold text-2xl mb-1">{club.clubname}</Text>
                <View className="bg-[#EEEEEE] rounded-md py-1 px-2">
                  <Text className="text-[10px] text-[#545454]">
                    {club.users}/{club.maxUser} Mitglieder
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
