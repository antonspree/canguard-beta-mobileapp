import React, { useEffect } from "react";

// expo
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// native
import { SafeAreaProvider } from "react-native-safe-area-context";

// import { store } from "@/store/store";
// import { Provider as StoreProvider } from "react-redux";
import "@/style/global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    // <StoreProvider store={store}>
      // <RootSiblingParent>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Slot screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      // </RootSiblingParent>
    // </StoreProvider>
  );
};

export default RootLayout;
