import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "@/screens/app/dashboard/owner_screens/setting/Profile";
import GeneralScreen from "@/screens/app/dashboard/owner_screens/setting/General";

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
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Allgemein" component={GeneralScreen} />
      <Tab.Screen name="Design" component={ProfileScreen} />
      <Tab.Screen name="Dokumente" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
