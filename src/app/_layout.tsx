import React, { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { Provider as StoreProvider } from "react-redux";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { store } from "@/store/store";
import { clearData } from "@/lib/storage";
import { NAV_THEME } from "@/lib/constant";

import "@/globals.css";
import { MenuProvider } from "react-native-popup-menu";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast style={{ zIndex: 9999 }} {...props} />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast style={{ zIndex: 9999 }} {...props} />
  ),
  info: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <InfoToast style={{ zIndex: 9999 }} {...props} />
  ),
};

const RootLayout = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    clearData("token");
    clearData("userinfo");
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <ThemeProvider value={LIGHT_THEME}>
          <MenuProvider>
            <RootSiblingParent>
              <SafeAreaProvider>
                <StatusBar style="auto" />
                <Slot screenOptions={{ headerShown: false }} />
                <Toast config={toastConfig} topOffset={100} />
              </SafeAreaProvider>
            </RootSiblingParent>
          </MenuProvider>
        </ThemeProvider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default RootLayout;
