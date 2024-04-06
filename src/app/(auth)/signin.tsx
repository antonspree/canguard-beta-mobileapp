import React from "react";
import SignInScreen from "@/view/auth/SignInScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const SingUp: React.FC = () => {
  return (
    <SafeAreaView>
      <SignInScreen />
    </SafeAreaView>
  );
};

export default SingUp;
