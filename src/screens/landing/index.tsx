import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import tw from "twrnc";
import { loadData } from "@/lib/storage";
import Text from "@/elements/Text";

const LandingScreen: React.FC = () => {
  const onPress = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(app)/(dashboard)/home");
    } else {
      router.replace("/(guest)/signin");
    }
  };

  return (
    <View style={tw`relative`}>
      <Image
        style={tw`absolute w-full h-full`}
        placeholder="background"
        source={require("../../assets/images/welcome.png")}
      />
      <View style={tw`w-full h-full flex justify-end`}>
        <LinearGradient
          style={tw`h-2/3 flex justify-end`}
          colors={["transparent", "#000000"]}
          start={[0, 0]}
          end={[0, 0.5]}
        >
          <View style={tw`flex flex-col gap-5 px-10 pb-24`}>
            <Text variant="displaySmall" style={tw`font-bold text-white`}>
              Die Software für deinen Social Club
            </Text>
            <Text variant="bodyLarge" style={tw`text-white`}>
              Die ideale Softwarelösung für deinen Anbauverein. Organisiere
              Mitglieder und behalte Anbau sowie Distribution stets im Blick.
            </Text>
            <Button mode="contained" buttonColor="#19A873" onPress={onPress}>
              <Text style={tw`text-center text-base text-white`}>Starten</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
export default LandingScreen;
