import * as React from "react";
import { Redirect, Slot, useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/store/hook";
import MenuDrawer from "@/components/MenuDrawer";
import Text from "@/elements/Text";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (user && user.club) {
      // User is signed in and has a club, redirect to dashboard if not already there
      if (!segments.includes("(dashboard)")) {
        router.replace("/(dashboard)");
      }
    } else if (user && !user.club) {
      // User is signed in but has no club, redirect to noclub if not already there
      if (!segments.includes("(noclub)")) {
        router.replace("/(noclub)");
      }
    } else {
      // User is not signed in, redirect to sign-in page if not already in auth group
      if (!inAuthGroup) {
        router.replace("/sign-in");
      }
    }
  }, [user, segments]);

  if (user === undefined) {
    // User is not loaded yet, do nothing
    return <Redirect href={"/(guest)/signin"} />;
  }

  return (
    <>
      <MenuDrawer>
        <Slot />
      </MenuDrawer>
    </>
  );
}
