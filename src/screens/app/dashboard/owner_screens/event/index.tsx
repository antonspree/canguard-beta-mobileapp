import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getEvent } from "@/actions/event";
import Container from "@/components/Container";
import { getTimeDifferenceInGerman } from "@/lib/function";
import Text from "@/elements/Text";

const EventScreen = () => {
  const [eventData, setEventData] = useState<any>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getEvent();

      if (result.success) {
        setEventData(result.event);
      }
    })();
  }, []);

  return (
    <Container>
      <View style={tw`px-5 py-5`}>
        <View style={tw`space-y-2 mb-5`}>
          <Searchbar
            style={tw`border border-[#EFEFEF] bg-white`}
            placeholderTextColor="#808089"
            iconColor="#808089"
            placeholder="Suchen"
            onChangeText={setSearch}
            value={search}
          />
          <View style={tw`bg-white rounded-2xl mb-2 overflow-hidden`}>
            <View style={tw`p-4`}>
              <View>
                {eventData
                  .filter((f: any) => f.content.includes(search))
                  .map((item: any, key: number) => (
                    <View style={tw`flex-row`} key={key}>
                      <View style={tw`flex flex-col`}>
                        <View
                          style={tw`w-8 h-8 flex-row justify-center items-center rounded-full bg-[#EFEFEF]`}
                        >
                          <AntDesign name="user" size={16} color="white" />
                        </View>
                        <View
                          style={tw`flex-1 w-0.5 min-h-2 self-center bg-[#EFEFEF]`}
                        ></View>
                      </View>
                      <View style={tw`flex-1 gap-1 pl-2 mb-4`}>
                        <View
                          style={tw`flex justify-center h-8 text-[9px] text-content`}
                        >
                          <Text style={tw`text-[9px] text-content`}>
                            {item.date && getTimeDifferenceInGerman(item.date)}
                          </Text>
                        </View>
                        <Text style={tw`flex-1 text-xs`}>{item.content}</Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default EventScreen;
