import DashbordFooter from "@/components/layout/Footer";
import DashboardHeader from "@/components/layout/Header";
import React from "react";
import { View, Text, ScrollView } from "react-native";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <View className="relative h-[100vh]">
      <DashboardHeader />
      <ScrollView className="bg-gray-100">
        <View className="h-20"></View>
        {children}
        <View className="h-20"></View>
      </ScrollView>
      <DashbordFooter />
    </View>
  );
};

export default DashboardLayout;
