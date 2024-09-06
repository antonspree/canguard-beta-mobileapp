import * as React from "react";
import { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { feedActions } from "@/store/reducers/feedReducer";
import { getFeed } from "@/actions/feed";
import { useAppDispatch } from "@/store/hook";
import { useTheme } from "@/hooks/useThemeProvider";
import { MaterialBottomTabs } from "@/layouts/MaterialBottomTabs";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      const result = await getFeed();

      if (result.success) {
        dispatch(feedActions.setFeed({ feed: result.feed }));
      }
    })();
  }, [dispatch]);

  return (
    <MaterialBottomTabs
      safeAreaInsets={{ bottom: 0 }}
      activeColor={colors.bgColor}
      inactiveColor="#C8C8C8"
      barStyle={{
        backgroundColor: "#ffffff",
        borderTopColor: "#EAEAEA",
        borderTopWidth: 1,
      }}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      activeIndicatorStyle={{
        backgroundColor: "transparent",
      }}
    >
      <MaterialBottomTabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                name="view-dashboard"
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon(props: any) {
            return (
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="club"
        options={{
          tabBarLabel: "Club",
          tabBarIcon(props: any) {
            return <Entypo name="home" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profil",
          tabBarIcon(props: any) {
            return <Ionicons name="person" size={24} color={props.color} />;
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="community"
        options={{
          tabBarLabel: "Community",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                name="account-group"
                color={props.color}
                size={24}
              />
            );
          },
        }}
      />
      <MaterialBottomTabs.Screen
        name="event"
        options={{
          tabBarLabel: "Ereignisse",
          tabBarIcon(props: any) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? "calendar" : "calendar-outline"}
              />
            );
          },
        }}
        redirect
      />
    </MaterialBottomTabs>
  );
}
