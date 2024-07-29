import React from "react";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { loadData } from "@/lib/storage";

const LandingScreen: React.FC = () => {
  const onPress = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(app)/(dashboard)");
    } else {
      router.replace("/(guest)/signin");
    }
  };

  return (
    <View className="relative">
      <Image
        className="absolute w-full h-full"
        placeholder="background"
        source={require("../../assets/images/welcome.png")}
      />
      <View className="w-full h-full flex justify-end">
        <LinearGradient
          className="h-2/3 flex justify-end"
          colors={["transparent", "#000000"]}
          start={[0, 0]}
          end={[0, 0.5]}
        >
          <View className="flex flex-col space-y-5 px-10 pb-24">
            <Text className="font-bold text-4xl text-white">
              Die Software für deinen Social Club
            </Text>
            <Text className="text-white text-base">
              Die ideale Softwarelösung für deinen Anbauverein. Organisiere
              Mitglieder und behalte Anbau sowie Distribution stets im Blick.
            </Text>
            <Pressable
              className="py-2 bg-[#19A873] rounded-2xl"
              onPress={onPress}
            >
              <Text className="font-bold text-center text-base text-white">
                Starten
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default LandingScreen;
