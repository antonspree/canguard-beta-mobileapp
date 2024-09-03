import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "expo-router";
import tw from "twrnc";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/store/hook";
import Text from "@/elements/Text";
import Analytic from "@/components/Analytic";
import Card from "@/components/Card";
import ClubStatus from "@/components/ClubStatus";
import { cn } from "@/lib/utils";
import { isEmpty } from "@/lib/function";

const OwnerScreen: React.FC = () => {
  const { members } = useAppSelector((state) => state.members);
  const { club } = useAppSelector((state) => state.club);

  const [progress, setProgress] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      let count = 0;

      !isEmpty(club?.document) && count++;

      !isEmpty(club?.street) &&
        !isEmpty(club?.address) &&
        !isEmpty(club?.postcode) &&
        !isEmpty(club?.city) &&
        !isEmpty(club?.country) &&
        count++;

      (!isEmpty(club?.discord) ||
        !isEmpty(club?.tiktok) ||
        !isEmpty(club?.youtube) ||
        !isEmpty(club?.twitch) ||
        !isEmpty(club?.facebook)) &&
        count++;

      !isEmpty(club?.badge) && !isEmpty(club?.avatar) && count++;

      (club?.users as number) >= 2 && count++;

      setProgress(count * 20);
    }, [club])
  );

  return (
    <ScrollView>
      <View style={tw`gap-3 m-5`}>
        <View style={tw`flex flex-col gap-3`}>
          <View>
            <Analytic
              title="Mitglieder"
              content={club?.users as number}
              info=""
              icon={<Feather name="users" size={16} color="black" />}
            />
          </View>
          <View>
            <Analytic
              title="Offene Anfragen"
              content={members?.filter((f) => f.status === "pending").length}
              info=""
              icon={<Feather name="credit-card" size={16} color="black" />}
            />
          </View>
          <View>
            <Analytic
              title="Umsatz"
              content="€8.200,65"
              info="+20.1% from last month"
              icon={<Feather name="dollar-sign" size={16} color="black" />}
              isComingSoon
            />
          </View>
          <View>
            <Analytic
              title="Lagerkapazität"
              content="49%"
              info="+201 from last month"
              icon={<Ionicons name="analytics" size={16} color="black" />}
              isComingSoon
            />
          </View>
        </View>
        <Card style={tw`gap-3 p-5`}>
          <View style={tw`flex flex-col gap-1`}>
            <Text style={tw`text-base font-semibold`}>Dein Club</Text>
            <Text variant="bodySmall" style={tw`text-[#919191]`}>
              Erledige alle offenen Aufgaben, um Deinen Club weiter nach vorne
              zu bringen.
            </Text>
          </View>
          {/* <View className="space-y-1.5">
            <Textrogress value={progress} />
            <Text className="text-sm text-[#919191]">{progress}%</Text>
          </View> */}
          <View style={tw`gap-2`}>
            <View>
              <ClubStatus
                done={!isEmpty(club?.document)}
                title="Satzung erstellen & hochladen"
                content="Erstelle und lade deine Vereinssatzung hoch."
              />
            </View>
            <View>
              <ClubStatus
                done={
                  !isEmpty(club?.street) &&
                  !isEmpty(club?.address) &&
                  !isEmpty(club?.postcode) &&
                  !isEmpty(club?.city) &&
                  !isEmpty(club?.country)
                }
                title="Vereinssitz bestimmen"
                content="Bestimmte den aktuellen Sitz deines Clubs."
              />
            </View>
            <View>
              <ClubStatus
                done={
                  !isEmpty(club?.discord) ||
                  !isEmpty(club?.tiktok) ||
                  !isEmpty(club?.youtube) ||
                  !isEmpty(club?.twitch) ||
                  !isEmpty(club?.facebook)
                }
                title="Social Media verbinden"
                content="Verbinde deine Kanäle mit Canify."
              />
            </View>
            <View>
              <ClubStatus
                done={!isEmpty(club?.badge) && !isEmpty(club?.avatar)}
                title="Clublogo und Banner hinzufügen"
                content="Verbessere die Darstellung Deines Clubs."
              />
            </View>
            <View>
              <ClubStatus
                done={(club?.users as number) >= 2}
                title="Lade dein erstes Mitglied ein"
                content="Fülle Deinen Club mit Mitgliedern."
              />
            </View>
          </View>
        </Card>
        <Card style={tw`p-5`}>
          <View style={tw`flex flex-col space-y-1`}>
            <Text style={tw`text-base font-semibold`}>Mitglieder</Text>
            <Text style={tw`text-sm text-[#919191]`}>
              Lade Mitglieder in Deinen Club ein, solange du noch die
              Möglichkeit dazu hast.
            </Text>
          </View>
          <View
            style={tw`overflow-hidden relative h-48 flex justify-center items-center mt-5 rounded-xl bg-[#F5F5F5]`}
          >
            <View
              style={{
                height: `${Math.trunc(
                  ((club?.users as number) / (club?.maxUser as number)) * 100
                )}%`,
              }}
              className={cn(
                "absolute w-full bottom-0",
                (club?.users as number) < ((club?.maxUser as number) / 5) * 1 &&
                  "bg-red-500",
                (club?.users as number) >=
                  ((club?.maxUser as number) / 5) * 1 &&
                  (club?.users as number) <
                    ((club?.maxUser as number) / 5) * 2 &&
                  "bg-orange-500",
                (club?.users as number) >=
                  ((club?.maxUser as number) / 5) * 2 &&
                  (club?.users as number) <
                    ((club?.maxUser as number) / 5) * 3 &&
                  "bg-amber-500",
                (club?.users as number) >=
                  ((club?.maxUser as number) / 5) * 3 &&
                  (club?.users as number) <
                    ((club?.maxUser as number) / 5) * 4 &&
                  "bg-yellow-500",
                (club?.users as number) >=
                  ((club?.maxUser as number) / 5) * 4 &&
                  (club?.users as number) < (club?.maxUser as number) &&
                  "bg-lime-500",
                (club?.users as number) === (club?.maxUser as number) &&
                  "bg-green-500"
              )}
            />
            <Text
              style={tw`text-sm font-medium text-center text-[#919191] z-50`}
            >
              {club?.users as number}/{club?.maxUser}
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default OwnerScreen;
