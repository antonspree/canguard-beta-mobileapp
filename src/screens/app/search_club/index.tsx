import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { getAllClubs } from "@/actions/club";
import Club from "@/components/Club";

const SearchClubScreen: React.FC = () => {
  const [clubData, setClubData] = useState<any>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const result = await getAllClubs();

        setClubData(result.club);
      })();
    }, [])
  );

  return (
    <ScrollView>
      <View className="flex flex-col space-y-5 m-5">
        <View className="h-[200px] bg-slate-500 rounded-md" />
        <View className="py-2 border border-[#EAEAEA] rounded-md">
          <TextInput
            className="px-3 outline-none"
            placeholder="Suchen"
            onChangeText={setSearch}
          />
        </View>
        <View className="flex flex-col space-y-3">
          {clubData
            .filter(
              (f: any) =>
                (f.city &&
                  String(f.city)
                    .toLowerCase()
                    .includes(String(search).toLowerCase())) ||
                String(f.clubname)
                  .toLowerCase()
                  .includes(String(search).toLowerCase())
            )
            .map((item: any, key: number) => (
              <View key={key}>
                <Club
                  clubname={item.clubname}
                  badge={item.badge}
                  avatar={item.avatar}
                  users={item.users}
                  maxUser={item.maxUser}
                  description={item.description}
                  email={item.email}
                  phone={item.phone}
                  website={item.website}
                  instagram={item.instagram}
                  discord={item.discord}
                  facebook={item.facebook}
                  youtube={item.youtube}
                  clubID={item.clubID}
                  allowRequest={item.allow_request}
                />
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchClubScreen;
