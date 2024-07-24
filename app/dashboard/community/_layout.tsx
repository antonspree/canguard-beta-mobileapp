import React from "react";
import { Pressable, Text, View } from "react-native";
import { Link, Navigator, Slot } from "expo-router";
import {
  CreditCard,
  LayoutPanelLeft,
  ShieldCheckIcon,
  Users,
} from "lucide-react-native";

export default function CommLayout() {
  return (
    <View className="flex-1 py-5">
      <Navigator>
        <CommTabbar />
        <Slot />
      </Navigator>
    </View>
  );
}

function useIsTabSelected(name: string): boolean {
  const { state } = Navigator.useContext();
  const current = state.routes.find((route, i) => state.index === i);

  if (current === undefined) return false;

  return current.name === name;
}

export function CommTabbar() {
  return (
    <View className="flex-row px-5 mb-3">
      <CommTabbarItem href={"/dashboard/community"} name="index">
        {({ isSelected }: { isSelected: boolean }) => (
          <>
            <Users
              className="mr-1"
              color={isSelected ? "#19A873" : "#0F172A"}
              size={16}
            />
            <Text className={isSelected ? "text-[#19A873]" : "text-[#0F172A]"}>
              Feed
            </Text>
          </>
        )}
      </CommTabbarItem>
      <CommTabbarItem href={"/dashboard/community/profile"} name="profile">
        {({ isSelected }: { isSelected: boolean }) => (
          <>
            <LayoutPanelLeft
              className="mr-1"
              color={isSelected ? "#19A873" : "#0F172A"}
              size={16}
            />
            <Text className={isSelected ? "text-[#19A873]" : "text-[#0F172A]"}>
              Profil
            </Text>
          </>
        )}
      </CommTabbarItem>
      <CommTabbarItem href={"/dashboard/community/club"} name="club">
        {({ isSelected }: { isSelected: boolean }) => (
          <>
            <CreditCard
              className="mr-1"
              color={isSelected ? "#19A873" : "#0F172A"}
              size={16}
            />
            <Text className={isSelected ? "text-[#19A873]" : "text-[#0F172A]"}>
              Club
            </Text>
          </>
        )}
      </CommTabbarItem>
      <CommTabbarItem href={"/dashboard/community/following"} name="following">
        {({ isSelected }: { isSelected: boolean }) => (
          <>
            <ShieldCheckIcon
              className="mr-1"
              color={isSelected ? "#19A873" : "#0F172A"}
              size={16}
            />
            <Text className={isSelected ? "text-[#19A873]" : "text-[#0F172A]"}>
              Following
            </Text>
          </>
        )}
      </CommTabbarItem>
    </View>
  );
}

export const CommTabbarItem = ({
  href,
  children,
  name,
}: {
  href: string;
  children: any;
  name: string;
}) => {
  const isSelected = useIsTabSelected(name);

  return (
    <Link
      href={href}
      asChild
      className={`flex-1 flex-row items-center justify-center py-3 border-b-2 border-gray-200 rounded-t-lg${
        isSelected ? " bg-[#19A87326] border-[#19A873]" : ""
      }`}
    >
      <Pressable className="flex-row items-center">
        {(props) => children({ ...props, isSelected })}
      </Pressable>
    </Link>
  );
};
