import * as React from "react";
import { Animated, Dimensions, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { router, usePathname } from "expo-router";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppSelector } from "@/store/hook";
import { UPLOAD_URI } from "@/config/env";
import Text from "@/elements/Text";
import { useDispatch } from "react-redux";
import { appActions } from "@/store/reducers/appReducer";
import { clearData } from "@/lib/storage";

export default function MenuDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const screenWidth = Dimensions.get("window").width;

  const { visibleDrawerMenu } = useAppSelector((store) => store.app);
  const { user } = useAppSelector((store) => store.user);

  const offsetValue = React.useRef(new Animated.Value(0)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;

  const currentPath = pathname.split("/")[1];

  const handleLogout = () => {
    clearData("token");
    router.replace("/(guest)/signin");
  };

  React.useEffect(() => {
    Animated.timing(offsetValue, {
      toValue: !visibleDrawerMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visibleDrawerMenu]);

  React.useEffect(() => {
    dispatch(appActions.setVisibleDrawerMenu(false));
  }, [currentPath]);

  return (
    <View className="flex-1 bg-[#EAEAEA]">
      <View className={`relative flex-1 p-4 mr-[calc(${screenWidth}px-230px)]`}>
        <IconButton
          className="absolute right-0"
          icon="close"
          onPress={() => dispatch(appActions.setVisibleDrawerMenu(false))}
        />
        <View className="items-center pt-10">
          <View className="flex-col justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-2 overflow-hidden">
            {user?.avatar ? (
              <Image
                source={UPLOAD_URI + user.avatar}
                className="w-20 h-20"
                placeholder="logo"
              />
            ) : (
              <FontAwesome name="user" color={"#8E8E8E"} size={32} />
            )}
          </View>
          <Text variant="titleSmall">{user?.username}</Text>
          <Text variant="bodySmall" className="text-[808080]">
            {user?.email}
          </Text>
        </View>
        <View className="flex-1 mt-8">
          <Button
            onPress={() => router.push("/(app)/(dashboard)/home")}
            mode="contained"
            className="rounded-lg ml-0 mr-0"
            textColor={currentPath === "home" ? "#FFFFFF" : "#19A873"}
            buttonColor={currentPath === "home" ? "#19A873" : "transparent"}
          >
            Dashboard
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/chat")}
            className="rounded-lg ml-0 mr-0"
            textColor={currentPath === "chat" ? "#FFFFFF" : "#19A873"}
            buttonColor={currentPath === "chat" ? "#19A873" : "transparent"}
          >
            Chat
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/club")}
            className="rounded-lg ml-0 mr-0"
            textColor={currentPath === "club" ? "#FFFFFF" : "#19A873"}
            buttonColor={currentPath === "club" ? "#19A873" : "transparent"}
          >
            Club
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/profile")}
            className="rounded-lg ml-0 mr-0"
            textColor={currentPath === "profile" ? "#FFFFFF" : "#19A873"}
            buttonColor={currentPath === "profile" ? "#19A873" : "transparent"}
          >
            Profil
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/community")}
            className="rounded-lg ml-0 mr-0"
            textColor={currentPath === "community" ? "#FFFFFF" : "#19A873"}
            buttonColor={
              currentPath === "community" ? "#19A873" : "transparent"
            }
          >
            Community
          </Button>
        </View>
        <View>
          <Button
            onPress={handleLogout}
            className="rounded-lg ml-0 mr-0"
            textColor={false ? "#FFFFFF" : "#19A873"}
          >
            Log out
          </Button>
        </View>
      </View>
      <Animated.View
        className="flex-1 flex absolute top-0 bottom-0 left-0 right-0"
        style={{
          transform: [{ translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <View
            style={{
              backgroundColor: "#000000",
              flex: 1,
            }}
          >
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
