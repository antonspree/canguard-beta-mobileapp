import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import TimeAgo from 'react-native-timeago';

export default function MessageBox({ item, user }: any) {
  const status = item.user._id !== user._id;

  const { width } = useWindowDimensions();

  return (
    <View>
      <View className={`w-full ${status ? "items-start" : "items-end"} mb-4`}>
        <View className="flex-row items-center">
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            className="mr-1"
          />
          <View
            className={`max-w-[50%] p-3 rounded-lg mb-1 min-w-[150px] ${
              status ? "bg-white" : "bg-green-100"
            }`}
          >
            <View className="w-full flex-row justify-between">
                <Text className="font-bold text-[10px] mb-1">{item.user.username}</Text>
                {/* <Text className="font-bold text-[10px] mb-1">{item.date}</Text> */}
                <TimeAgo time={item.date} />
            </View>
            <View className="mb-2">
              <RenderHtml
                contentWidth={width}
                source={{
                  html: item.chat || "",
                }}
              />
            </View>
          </View>
        </View>
        <Text className="ml-8">{item.time}</Text>
      </View>
    </View>
  );
}
