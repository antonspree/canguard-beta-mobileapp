// expo
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// native
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// utils
import { loadData } from "@/utils/storage";

// assets
import BackImage from "@/assets/images/welcome.png";

export default function App() {
  const onPress = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/(main)/home");
    } else {
      router.replace("/(auth)/signin");
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground className="w-full h-full" source={BackImage}>
        <View className="w-full h-full flex flex-col justify-end">
          <LinearGradient
            colors={["transparent", "rgb(0,0,0)"]}
            start={[0, 0]}
            end={[0, 0.4]}
            className="w-full h-2/3 flex flex-col justify-end "
          >
            <View className="w-full px-8 pb-14">
              <Text className="text-white font-bold text-5xl mb-4">
                Die Software für deinen Social Club
              </Text>
              <Text className="text-white font-normal text-base mb-4">
                Die ideale Softwarelösung für deinen Anbauverein. Organisiere
                Mitglieder und behalte Anbau sowie Distribution stets im Blick.
              </Text>
              <Pressable onPress={onPress} className="bg-[#19A873] rounded-2xl">
                <Text className="text-white font-bold text-lg text-center py-2">
                  Starten
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
