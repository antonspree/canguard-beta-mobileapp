import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CommFeedScreen from "@/screens/app/dashboard/owner_screens/community";
import CommingSoon from "@/widgets/CommingSoon";

const Tab = createMaterialTopTabNavigator();

export default function Community() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: "capitalize",
          margin: 0,
        },
      }}
    >
      <Tab.Screen name="Feed" component={CommFeedScreen} />
      <Tab.Screen name="Profil" component={CommingSoon} />
      <Tab.Screen name="Club" component={CommingSoon} />
      <Tab.Screen name="Following" component={CommingSoon} />
    </Tab.Navigator>
  );
}
