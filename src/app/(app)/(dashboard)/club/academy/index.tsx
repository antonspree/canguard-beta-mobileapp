import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "@/screens/app/dashboard/owner_screens/setting/Profile";
import GeneralScreen from "@/screens/app/dashboard/owner_screens/setting/General";
import DesignScreen from "@/screens/app/dashboard/owner_screens/setting/design";
import DocumentsScreen from "@/screens/app/dashboard/owner_screens/setting/Documents";
import CommingSoon from "@/widgets/CommingSoon";
import FoundationScreen from "@/screens/app/dashboard/owner_screens/academy/Foundation";

const Tab = createMaterialTopTabNavigator();

export default function Academy() {
  return (
    <Tab.Navigator
      initialRouteName="Gründung"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: "capitalize",
          margin: 0,
        },
      }}
    >
      <Tab.Screen name="Gründung" component={FoundationScreen} />
      <Tab.Screen name="Grow" component={CommingSoon} />
      <Tab.Screen name="Verwaltung" component={CommingSoon} />
      <Tab.Screen name="Rechtliches" component={CommingSoon} />
    </Tab.Navigator>
  );
}
