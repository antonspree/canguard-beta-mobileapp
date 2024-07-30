import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";

export default function MessageBox({ item, user }: any) {
  const status = item.user._id !== user._id;

  const { width } = useWindowDimensions();

  return (
    <View className="px-2">
      <View className={`w-full ${status ? "items-start" : "items-end"} mb-1`}>
        <View className="flex-row items-center space-x-2">
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="black"
            className="mr-1"
          />
          <View
            className={`max-w-[60%] py-1 px-2 rounded-lg mb-1 min-w-[150px] ${
              status ? "bg-white" : "bg-green-100"
            }`}
          >
            <View className="w-full flex-row justify-between">
              <Text className="font-bold text-[10px] mb-1">
                {item.user.username}
              </Text>
              <Text className="text-[8px] mb-1 capitalize text-[#777777]">
                <TimeAgo time={item.date} />
              </Text>
            </View>
            <View className="mb-2">
              <RenderHtml
                emSize={0.3}
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
