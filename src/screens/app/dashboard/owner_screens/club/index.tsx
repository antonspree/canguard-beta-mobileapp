import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Container from "@/components/Container";
import { useAppSelector } from "@/store/hook";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const styles = StyleSheet.create({
  button: {
    borderColor: "#000000", // Border color
  },
  label: {
    color: "#000000", // Text color (optional)
  },
});

const ClubScreen: React.FC = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return null;

  return (
    <Container>
      <View className="px-5">
        <View className="space-y-2 mb-5">
          <View className="flex-row space-x-2">
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"account-multiple"}
              textColor="black"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text className="text-center text-sm">Mitglieder</Text>
            </Button>
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"cog"}
              textColor="black"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text className="text-center text-sm">Einstellungen</Text>
            </Button>
          </View>
          <View className="flex-row space-x-2">
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"school"}
              textColor="black"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text className="text-center text-sm">Academy</Text>
            </Button>
            <Button
              className="flex-1 rounded-md border"
              mode="contained"
              buttonColor="white"
              onPress={() => router.push("/(app)/(dashboard)/setting")}
              style={{ borderColor: "#EFEFEF" }}
              icon={"search-web"}
              textColor="black"
              contentStyle={{
                paddingVertical: 5,
              }}
            >
              <Text className="text-center text-sm">Clubsuche</Text>
            </Button>
          </View>
        </View>
        <View className="bg-white rounded-2xl mb-2 overflow-hidden">
          <View className="overflow-hidden">
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
