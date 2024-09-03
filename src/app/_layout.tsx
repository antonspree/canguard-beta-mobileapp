import * as React from "react";
import { SplashScreen } from "expo-router";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { Provider as StoreProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";

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
import { NAV_THEME } from "@/lib/constant";
import AppLayout from "@/screens/app-layout";

import "@/globals.css";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const queryClient = new QueryClient();

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

  if (!loaded && !error) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <MenuProvider>
            <ThemeProvider value={LIGHT_THEME}>
              <RootSiblingParent>
                <SafeAreaProvider>
                  <AppLayout />
                </SafeAreaProvider>
              </RootSiblingParent>
            </ThemeProvider>
          </MenuProvider>
        </QueryClientProvider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default RootLayout;
