import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { updateColor } from "@/actions/club";
import { useAppSelector } from "@/store/hook";
import { colorData } from "@/lib/constant";
import { useDispatch } from "react-redux";
import { clubActions } from "@/store/reducers/clubReducer";
import Text from "@/elements/Text";
import { useTheme } from "@/hooks/useThemeProvider";

const ClubColor = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { club } = useAppSelector((state) => state.club);

  const [color, setColor] = useState<string>(colorData[0].name);

  const handleSubmit = async () => {
    const result = await updateColor({ color: color });

    Toast.show({
      type: "success",
      text1: "Glückwunsch",
      text2: result.msg,
    });

    if (result.success) {
      dispatch(clubActions.setClub({ club: result.club }));
    }
  };

  useEffect(() => {
    setColor(club?.color as string);
  }, [club]);

  return (
    <View className="bg-white rounded-2xl mb-4">
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="">
          <Text className="font-semibold text-lg">Club Farben</Text>
          <Text className="text-xs text-[#808089]">
            Hier kannst du die Farben deines Clubs anpassen.
          </Text>
        </View>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="mb-4">
          <View className="mb-6 space-y-1">
            <Text className="text-sm">Akzentfarbe</Text>
            <Text className="text-[#808089] text-xs">
              Diese Farbe wird verwendet, um bestimmte Elemente in Canify
              hervorzuheben.
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-1 items-center mx-auto justify-center px-4">
            {colorData.map((item, key) => (
              <Pressable
                key={key}
                className={`w-7 h-7 ${item.bgColor}${
                  color === item.name
                    ? ` border-4 ${item.borderColor}`
                    : ` border-2 border-white`
                } rounded-full`}
                onPress={() => setColor(item.name)}
              >
                <View></View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View className="flex-row justify-end px-4 py-3">
        <Button
          mode="contained"
          buttonColor={colors.bgColor}
          onPress={handleSubmit}
          className="rounded-lg"
        >
          <Text className="font-bold text-center text-xs text-white">
            Speichern
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ClubColor;
