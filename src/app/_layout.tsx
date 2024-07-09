import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { store } from "@/store/store";
import { MenuProvider } from "react-native-popup-menu";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import "@/style/global.css";
import { clearData } from "@/lib/storage";

SplashScreen.preventAutoHideAsync();

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

const RootLayout: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    clearData("token");
    clearData("userinfo");
  }, []);

  return (
    <StoreProvider store={store}>
      <MenuProvider>
        <RootSiblingParent>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Slot screenOptions={{ headerShown: false }} />
            <Toast config={toastConfig} topOffset={100} />
          </SafeAreaProvider>
        </RootSiblingParent>
      </MenuProvider>
    </StoreProvider>
  );
};

export default RootLayout;
