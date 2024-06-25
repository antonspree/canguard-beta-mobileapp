import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { cancelRequest } from "@/actions/user";
import { Card } from "@/components";
import { getCleanDate } from "@/lib/function";
import message from "@/lib/message";

const MemberScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleRequest = async () => {
    const result = await cancelRequest();

    message({ message: result.msg });

    if (result.success) {
      dispatch(userActions.setUser({ user: result.user }));
    }
  };

  const createAlert = () =>
    Alert.alert(
      "Anfrage zurückziehen?",
      "Das Zurückziehen deiner Anfrage ist endgültig und kann nicht rückgängig gemacht werden. Möchtest du fortfahren?",
      [
        {
          text: "OK",
          onPress: () => handleRequest(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View className="m-5">
      {user?.status === "pending" ? (
        <Card className="p-0">
          <View className="flex flex-col items-center space-y-2 p-5 border-b border-[#EAEAEA]">
            <Text className="font-bold text-xl">Meine Mitgliedschaft</Text>
            <Text className="text-sm text-[#919191]">
              {user?.club?.clubID} / {user?.memberID}
            </Text>
          </View>
          <View className="space-y-5 p-5">
            <View className="flex flex-col space-y-3">
              <View className="flex flex-row space-x-2 p-3 bg-[#55A3FF]/20 border border-[#55A3FF] rounded-md">
                <FontAwesome name="info-circle" size={20} color="#55A3FF" />
                <View className="flex flex-col space-y-1.5">
                  <Text className="font-semibold text-sm text-[#3C699D]">
                    Mitgliedsanfrage gestellt
                  </Text>
                  <Text className="text-xs text-[#55A3FF]">
                    Deine Mitgliedsanfrage ist beim Club eingegangen und wird
                    aktuell geprüft. Wir informieren dich, sobald über deine
                    Mitgliedschaft entschieden wurde.
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col space-y-2">
              <Text className="text-sm text-[#919191]">Status</Text>
              <View className="flex flex-row space-x-2">
                <View className="inline-flex items-center p-1 bg-[#0094FF]/25 border border-transparent rounded-md">
                  <Text className="text-xs font-semibold text-[#1C73B2]">
                    Angefragt
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col space-y-2">
              <Text className="text-sm text-[#919191]">Angefragt am</Text>
              <Text className="text-sm font-semibold">
                {getCleanDate(user?.memberdate as string, 2)}
              </Text>
            </View>
            <Pressable
              className="w-full flex justify-center items-center py-2 bg-red-500 rounded-md"
              onPress={createAlert}
            >
              <Text className="text-sm text-white">Anfrage zurückziehen</Text>
            </Pressable>
          </View>
        </Card>
      ) : (
        <View className="w-full flex flex-col justify-center items-center space-y-5 pt-20">
          <Feather name="check-circle" size={32} color="black" />
          <View className="w-full flex flex-col justify-center items-center space-y-2">
            <Text className="text-xl font-semibold text-center">
              Alles erledigt.
            </Text>
            <Text className="text-base text-center">
              Neuigkeiten für dich erscheinen hier, sobald es etwas zu berichten
              gibt.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MemberScreen;
