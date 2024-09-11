import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { clearData } from "@/lib/storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "@/store/hook";
import Container from "@/components/Container";
import ChangePasswordDialog from "@/widgets/ChangePasswordDialog";
import Text from "@/elements/Text";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";

const PersonalDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [changePassVisible, setChangePassVisible] = useState<boolean>(false);

  const handleLogout = () => {
    clearData("token");
    dispatch(userActions.setUser({ user: null }));
    dispatch(clubActions.setClub({ club: null }));
    dispatch(membersActions.setMembers({ members: null }));
    dispatch(membershipActions.setMembership({ membership: null }));
    router.replace("/(guest)/signin");
  };

  const redirectDiscord = () => {
    Linking.openURL("https://discord.gg/TEqKDcyZ");
  };

  return (
    <>
      <ChangePasswordDialog
        visible={changePassVisible}
        onDismiss={() => setChangePassVisible(false)}
      />
      <Container>
        <View className="px-5">
          <View className="bg-white rounded-2xl mb-3">
            <Text
              variant="titleSmall"
              className="px-4 py-4 border-b border-gray-100"
            >
              Mein Account
            </Text>
            <Pressable
              className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
              onPress={() => setChangePassVisible(true)}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={14}
                color="#8E8E8E"
              />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                E-Mail / Passwort ändern
              </Text>
            </Pressable>
            <Pressable
              className="flex flex-row items-center space-x-2 px-4 py-3"
              onPress={handleLogout}
            >
              <MaterialCommunityIcons
                name="logout-variant"
                size={14}
                color="#8E8E8E"
              />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                Logout
              </Text>
            </Pressable>
          </View>
          <View className="bg-white rounded-2xl mb-3">
            <Text
              variant="titleSmall"
              className="px-4 py-4 border-b border-gray-100"
            >
              Feedback & Kontakt
            </Text>
            <Pressable
              className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100"
              onPress={redirectDiscord}
            >
              <Feather name="send" size={14} color="#8E8E8E" />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                Fehler melden
              </Text>
            </Pressable>
            <Pressable
              className="flex flex-row items-center space-x-2 px-4 py-3"
              onPress={redirectDiscord}
            >
              <MaterialCommunityIcons
                name="cursor-default-click-outline"
                size={14}
                color="#8E8E8E"
              />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                Support kontaktieren
              </Text>
            </Pressable>
          </View>
          <View className="bg-white rounded-2xl mb-3">
            <Text
              variant="titleSmall"
              className="px-4 py-4 border-b border-gray-100"
            >
              Rechtliches
            </Text>
            <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
              <Feather name="external-link" size={14} color="#8E8E8E" />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                Datenschutzerklärung
              </Text>
            </Pressable>
            <Pressable className="flex flex-row items-center space-x-2 px-4 py-3 border-b border-gray-100">
              <Feather name="external-link" size={14} color="#8E8E8E" />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                Impressum
              </Text>
            </Pressable>
            <Pressable className="flex flex-row items-center space-x-2 px-4 py-3">
              <Feather name="external-link" size={14} color="#8E8E8E" />
              <Text variant="bodySmall" className="text-[#8E8E8E]">
                AGB
              </Text>
            </Pressable>
          </View>
        </View>
      </Container>
    </>
  );
};

export default PersonalDetailScreen;
