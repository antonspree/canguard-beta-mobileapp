import React, { useState } from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";
import Container from "@/components/Container";
import Text from "@/elements/Text";

const GeneralScreen = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [isMembershipRequest, setIsMembershipRequest] = useState(true);
  return (
    <Container>
      <View className="px-5">
        <View className="bg-white rounded-xl mb-4">
          <View className="py-3 px-3 border-b border-gray-100">
            <Text variant="bodySmall" className="text-[#808089]">
              Define general settings for your club. Once saved, they will be
              activated for all new members.
            </Text>
          </View>
          <View className="py-3 px-3">
            <View className="flex flex-row items-center mb-4">
              <View className="flex-1 gap-1.5">
                <Text variant="titleSmall">Mitgliedsanfragen erlauben</Text>
                <Text variant="bodySmall" className="text-[#808089]">
                  Hiermit erlaubst du Nutzern deinem Club Anfragen zu senden.
                </Text>
              </View>
              <View className="w-8 h-5 bg-red rounded-full">
                <Switch value={isRequest} onValueChange={setIsRequest} />
              </View>
            </View>
            <View className="flex flex-row items-center mb-4">
              <View className="flex-1 gap-1.5">
                <Text variant="titleSmall">
                  Mitgliedsanfragen automatisch akzeptieren
                </Text>
                <Text variant="bodySmall" className="text-[#808089]">
                  Hiermit werden automatisch alle Mitgliedsanfragen die deinem
                  Club gestellt werden akzeptiert.
                </Text>
              </View>
              <View className="w-8 h-5 bg-red rounded-full">
                <Switch
                  value={isMembershipRequest}
                  onValueChange={setIsMembershipRequest}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default GeneralScreen;
