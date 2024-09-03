import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, TextInput, View } from "react-native";
import MapView from "react-native-maps";
import { getAllClubs, getClubOfLimit } from "@/actions/club";
import ClubList from "./clubs";

const INITIAL_REGION = {
  latitude: 52.52,
  longitude: 13.405,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const SearchClubScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const [clubData, setClubData] = useState<any>([]);
  const [search, setSearch] = useState("");

  const onFetch = async (page: number) => {
    const result = await getClubOfLimit(page, 10);

    if (result && typeof result === "object" && "club" in result) {
      setClubData(result.club);
    }

    return result;
  };

  return (
    <ScrollView>
      <View className="flex flex-col space-y-5 m-5">
        {/* <View className="h-[200px] bg-slate-500 rounded-md" /> */}
        <View className="rounded-md overflow-hidden">
          <MapView
            ref={mapRef}
            initialRegion={INITIAL_REGION}
            style={{
              width: "auto",
              height: 200,
              borderRadius: 12,
            }}
          />
        </View>
        <View className="py-2 border border-[#EAEAEA] rounded-md">
          <TextInput
            className="px-3 outline-none"
            placeholder="Suchen"
            onChangeText={setSearch}
          />
        </View>
        <View className="flex flex-col space-y-3">
          <ClubList onFetch={onFetch} />
          {/* {clubData
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
            ))} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchClubScreen;
