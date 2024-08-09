import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import TimeAgo from "react-native-timeago";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UPLOAD_URI } from "@/config/env";

export default function MessageBox({ item, user }: any) {
  const status = item.user._id !== user._id;

  const { width } = useWindowDimensions();

  return (
    <View className="px-2 mb-4">
      <View className={`w-full ${status ? "items-start" : "items-end"}`}>
        <View className="flex-row space-x-1">
          <View className="flex-col justify-center items-center w-8 h-8 bg-[#ffffff] rounded-full mt-1 overflow-hidden shadow-2xl">
            {item.user.avatar ? (
              <Image source={UPLOAD_URI + user.avatar} className="w-8 h-8" />
            ) : (
              <Ionicons name="person" size={16} color={"#c9c9c9"} />
            )}
          </View>
          <View
            className={`max-w-[60%] py-1 px-2 rounded-lg min-w-[150px] ${
              status ? "bg-white" : "bg-green-100"
            } shadow-2xl`}
          >
            <View className="w-full flex-row justify-between">
              <Text className="font-bold text-[10px] mb-1 text-[#777777]">
                {item.user.username}
              </Text>
              <Text className="text-[8px] mb-1 capitalize text-[#777777]">
                <TimeAgo time={item.date} />
              </Text>
            </View>
            <View className="mb-2">
              <RenderHtml
                contentWidth={width}
                source={{
                  html: item.chat || "",
                }}
                defaultTextProps={{
                  selectable: true,
                }}
                tagsStyles={{
                  code: {
                    position: "relative",
                    backgroundColor: "#f4f4f5",
                    padding: 3,
                    fontSize: 14,
                    lineHeight: 20,
                    fontStyle: "normal",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    borderRadius: 4,
                  },
                  blockquote: {
                    paddingLeft: 12,
                    marginLeft: 0,
                    fontSize: 14,
                    lineHeight: 20,
                    fontStyle: "italic",
                    borderLeftWidth: 3,
                    borderLeftColor: "#f4f4f5",
                  },
                }}
              />
            </View>
          </View>
        </View>
        {/* <Text className="ml-8">{item.time}</Text> */}
      </View>
    </View>
  );
}
