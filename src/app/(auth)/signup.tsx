import React from "react";
import SignUpScreen from "@/view/auth/SignUpScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const SingUp: React.FC = () => {
  return (
    <SafeAreaView>
      <SignUpScreen />
    </SafeAreaView>
  );
};

export default SingUp;
