import React from "react";
import { Tabs, useFocusEffect } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
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
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(club)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default MainLayout;
