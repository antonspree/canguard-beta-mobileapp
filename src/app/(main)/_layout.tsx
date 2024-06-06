import React from "react";
import { Stack, useFocusEffect } from "expo-router";
import { useAppDispatch } from "@/store/hook";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";
import { getData } from "@/actions/user";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const result = await getData();

        if (result.success) {
          dispatch(userActions.setUser({ user: result.user }));
          dispatch(clubActions.setClub({ club: result.club }));
          dispatch(membersActions.setMembers({ members: result.members }));
          dispatch(
            membershipActions.setMembership({ membership: result.membership })
          );
        }
      })();
    }, [dispatch])
  );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="createclub" />
      <Stack.Screen name="searchclub" />
    </Stack>
  );
};
export default MainLayout;
