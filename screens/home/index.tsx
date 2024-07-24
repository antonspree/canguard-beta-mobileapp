import React from "react";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { loadData } from "@/libs/storage";
import { styles } from "./style";

const HomePage: React.FC = () => {
  const onPress = async () => {
    const token = await loadData("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/(guest)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        placeholder="background"
        source={require("../../assets/images/welcome.png")}
      />
      <View style={styles.contentWrapper}>
        <LinearGradient
          style={styles.linearBackground}
          colors={["transparent", "#000000"]}
          start={[0, 0]}
          end={[0, 0.5]}
        >
          <View style={styles.contents}>
            <Text style={styles.contentHeader}>
              Die Software für deinen Social Club
            </Text>
            <Text style={styles.contentDesc}>
              Die ideale Softwarelösung für deinen Anbauverein. Organisiere
              Mitglieder und behalte Anbau sowie Distribution stets im Blick.
            </Text>
            <Pressable style={styles.contentButton} onPress={onPress}>
              <Text style={styles.contentButtonText}>Starten</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomePage;
