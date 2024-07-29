import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerProps } from "@/types/component";

const Container: React.FC<ContainerProps> = ({ children = <></> }) => {
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="relative h-full w-full mx-auto bg-gray-100">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
