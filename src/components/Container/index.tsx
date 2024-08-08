import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerProps } from "@/types/component";

const Container: React.FC<ContainerProps> = ({ children = <></> }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 0, margin: 0 }}
      className="flex-1 h-full w-full p-0 m-0 bg-gray-100"
    >
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Container;
