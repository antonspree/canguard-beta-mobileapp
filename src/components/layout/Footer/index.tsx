import { useAppSelector } from "@/store/hook";
import { FontAwesome } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import {
  Plus,
  Search,
  MessageCircle,
  Users,
  User,
  LayoutGrid,
} from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

const DashbordFooter: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const pathname = usePathname();

  return user?.club ? (
    <View className="absolute bottom-0 left-0 z-10 flex flex-row items-center justify-between h-16 w-full">
      <View className="flex-1 flex flex-row h-16 pt-3">
        <View className="flex justify-center items-center bg-white h-full w-2 border-t border-gray-100"></View>
        <Pressable
          onPress={() => router.push("/dashboard")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <LayoutGrid
            color={pathname === "/dashboard" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard" ? "text-gray-500" : "text-gray-500/40"
            }`}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/dashboard/messages")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <MessageCircle
            color={pathname === "/dashboard/messages" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard/messages"
                ? "text-gray-500"
                : "text-gray-500/40"
            }`}
          >
            Chat
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/dashboard/club")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <Users
            color={pathname === "/dashboard/club" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard/club"
                ? "text-gray-500"
                : "text-gray-500/40"
            }`}
          >
            Club
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/dashboard/profile")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <User
            color={pathname === "/dashboard/profile" ? "#19A873" : "#19A87350"}
            size={24}
          />
          <Text
            className={`text-[9px] ${
              pathname === "/dashboard/profile"
                ? "text-gray-500"
                : "text-gray-500/40"
            }`}
          >
            Profil
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => router.push("/club/create")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <Plus color={pathname === "/dashboard" ? "#19A873" : "#19A87350"} />
          <Text className={`text-[9px] ${
              pathname === "/dashboard" ? "text-gray-500" : "text-gray-500/40"
            }`}>Create club</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/club/create")}
          className="flex-1 flex justify-center items-center bg-white h-full border-t border-gray-100"
        >
          <Plus color={pathname === "/dashboard" ? "#19A873" : "#19A87350"} />
          <Text className={`text-[9px] ${
              pathname === "/dashboard" ? "text-gray-500" : "text-gray-500/40"
            }`}>Create club</Text>
        </Pressable> */}
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
