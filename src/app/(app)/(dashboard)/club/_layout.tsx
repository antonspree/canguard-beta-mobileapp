import * as React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import Text from "@/elements/Text";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hook";
import { appActions } from "@/store/reducers/appReducer";

const ClubHeader = () => {
  const dispatch = useDispatch();

  const { visibleDrawerMenu } = useAppSelector((store) => store.app);

  const toggleDrawerMenu = () => {
    dispatch(appActions.setVisibleDrawerMenu(!visibleDrawerMenu));
  };

  return (
    <View className="flex-row items-center justify-between h-[74px] border-b border-[#EAEAEA] px-3">
      <IconButton
        icon="account"
        mode="contained"
        size={12}
        className="bg-[#EFEFEF]"
        iconColor="#5C5C5C"
        onPress={toggleDrawerMenu}
      />
      <View className="flex-1 flex-row justify-center mr-10">
        <Text variant="titleMedium">Mein Club</Text>
      </View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Club",
          header: ClubHeader,
        }}
      />
      <Stack.Screen
        name="academy"
        options={{
          title: "Academy",
        }}
      />
      <Stack.Screen
        name="setting"
        options={{
          title: "Club Setting",
        }}
      />
    </Stack>
  );
}
