import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerProps } from "@/types/component";

const Container: React.FC<ContainerProps> = ({ children = <></> }) => {
  return (
    <SafeAreaView className="h-full w-full mx-auto">
      {children}
    </SafeAreaView>
  );
};

export default Container;
