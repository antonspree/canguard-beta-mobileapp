import React from "react";
import { View, Pressable } from "react-native";
import { router, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  Plus,
  Search,
  MessageCircle,
  Users,
  User,
  LayoutGrid,
  Group,
  Settings,
  CalendarClock,
} from "lucide-react-native";
import { useAppSelector } from "@/store/hook";
import Text from "@/elements/Text";

const privateNavs = [
  {
    name: "Home",
    path: "/dashboard",
    icon: ({ color }: { color: string }) => (
      <LayoutGrid size={24} color={color} />
    ),
  },
  {
    name: "Mitglieder",
    path: "/dashboard/members",
    icon: ({ color }: { color: string }) => <Users size={24} color={color} />,
  },
  {
    name: "Ereignisse",
    path: "/events",
    icon: ({ color }: { color: string }) => (
      <CalendarClock size={24} color={color} />
    ),
  },
  {
    name: "Einstellungen",
    path: "/settings",
    icon: ({ color }: { color: string }) => (
      <Settings size={24} color={color} />
    ),
  },
  {
    name: "Chat",
    path: "/dashboard/messages",
    icon: ({ color }: { color: string }) => (
      <MessageCircle size={24} color={color} />
    ),
  },
  {
    name: "Club",
    path: "/dashboard/club",
    icon: ({ color }: { color: string }) => <Users size={24} color={color} />,
  },
  {
    name: "Profil",
    path: "/dashboard/profile",
    icon: ({ color }: { color: string }) => <User size={24} color={color} />,
  },
  {
    name: "Community",
    path: "/dashboard/community",
    icon: ({ color }: { color: string }) => <Group size={24} color={color} />,
  },
  {
    name: "Community",
    path: "/dashboard/profile",
    icon: ({ color }: { color: string }) => <Group size={24} color={color} />,
  },
];

const DashbordFooter: React.FC = () => {
  const pathname = usePathname();

  const { user } = useAppSelector((state) => state.user);

  return user?.club ? (
    <View className="absolute bottom-0 left-0 z-10 flex flex-row items-center justify-between h-16 w-full">
      <View className="flex-1 flex flex-row h-16 pt-3">
        <View className="flex justify-center items-center bg-white h-full w-2 border-t border-gray-100"></View>
        {privateNavs.map((nav, index) => {
          const { name, path, icon } = nav;
          const Icon = icon;

          return (
            <Pressable
              key={index}
              onPress={() => router.push(path)}
              className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
            >
              <Icon color={pathname === path ? "#19A873" : "#19A87350"} />
              <Text
                className={`text-[9px] ${
                  pathname === "/dashboard"
                    ? "text-gray-500"
                    : "text-gray-500/40"
                }`}
              >
                {name}
              </Text>
            </Pressable>
          );
        })}
        <View className="flex justify-center items-center bg-white h-full w-2 border-t border-gray-100"></View>
      </View>
    </View>
  ) : (
    <View className="absolute bottom-0 left-0 z-10 flex flex-row items-center justify-between h-16 w-full">
      <View className="flex-1 flex flex-row h-16 pt-3">
        <Pressable
          onPress={() => router.push("/club/create")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          {/* <FontAwesome size={24} name="plus" color={pathname === "/dashboard" ? "#19A873" : "#19A87350"} /> */}
          <Plus
            color={pathname === "/dashboard" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard" ? "text-gray-500" : "text-gray-500/40"
            }`}
          >
            Create club
          </Text>
        </Pressable>
      </View>
      <Pressable className="flex flex-row justify-center items-center bg-white border-gray-100 border min-w-[80px] h-full rounded-t-xl">
        <FontAwesome
          size={32}
          name="home"
          color={pathname === "/dashboard" ? "#19A873" : "#19A87350"}
        />
      </Pressable>
      <View className="flex-1 flex flex-row h-16 pt-3">
        <Pressable
          onPress={() => router.push("/club/search")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <Search
            color={pathname === "/dashboard" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard" ? "text-gray-500" : "text-gray-500/40"
            }`}
          >
            Search club
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DashbordFooter;
