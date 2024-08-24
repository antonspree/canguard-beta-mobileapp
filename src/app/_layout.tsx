import * as React from "react";
import { Slot, SplashScreen } from "expo-router";
import { Provider as StoreProvider } from "react-redux";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
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
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  React.useEffect(() => {
    clearData("token");
    clearData("userinfo");
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <ThemeProvider value={LIGHT_THEME}>
          <MenuProvider>
            <RootSiblingParent>
              <SafeAreaProvider>
                <GestureHandlerRootView className="app" style={{ flex: 1 }}>
                  <StatusBar style="auto" />
                  <Slot screenOptions={{ headerShown: false }} />
                  <Toast config={toastConfig} topOffset={100} />
                </GestureHandlerRootView>
              </SafeAreaProvider>
            </RootSiblingParent>
          </MenuProvider>
        </ThemeProvider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default RootLayout;
