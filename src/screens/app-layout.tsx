import * as React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { loadData } from "@/lib/storage";
import { getData } from "@/actions/user";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";
import ThemeProvider from "@/hooks/useThemeProvider";

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

const AppLayout = () => {
  const dispatch = useAppDispatch();

  const init = async () => {
    const token = await loadData("token");

    if (token) {
      const userData = await getData();
      dispatch(userActions.setUser({ user: userData.user }));
      dispatch(clubActions.setClub({ club: userData.club }));
      dispatch(membersActions.setMembers({ members: userData.members }));
      dispatch(
        membershipActions.setMembership({ membership: userData.membership })
      );
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView className="app" style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Slot screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} topOffset={100} />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default AppLayout;
