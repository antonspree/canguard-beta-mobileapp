import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "@/components/Container";
import Text from "@/elements/Text";

const BookingScreen = () => {
  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-2xl mb-4">
          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center space-x-2 mb-2">
              <MaterialCommunityIcons
                color={"#000000"}
                size={24}
                name={"card-bulleted-outline"}
              />
              <Text variant="titleMedium">Noch keine Buchungen</Text>
            </View>
            <Text variant="bodySmall">
              Hier findest du alle Buchungen, die dein Club für dich erstellt
              hat. Buchungen können z.B. für Aufnahmegebühren oder
              Mitgliedsbeiträge anfallen. CanGuard informiert dich automatisch,
              sobald eine neue Buchung erstellt wird.
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default BookingScreen;
