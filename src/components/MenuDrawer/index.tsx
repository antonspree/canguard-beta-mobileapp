import * as React from "react";
import { Animated, Dimensions, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { router, usePathname } from "expo-router";
import { Image } from "expo-image";
import tw from "twrnc";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppSelector } from "@/store/hook";
import { UPLOAD_URI } from "@/config/env";
import Text from "@/elements/Text";
import { useDispatch } from "react-redux";
import { appActions } from "@/store/reducers/appReducer";
import { clearData } from "@/lib/storage";
import { useTheme } from "@/hooks/useThemeProvider";
import { userActions } from "@/store/reducers/userReducer";
import { clubActions } from "@/store/reducers/clubReducer";
import { membersActions } from "@/store/reducers/membersReducer";
import { membershipActions } from "@/store/reducers/membershipReducer";

export default function MenuDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { colors } = useTheme();

  const screenWidth = Dimensions.get("window").width;

  const { visibleDrawerMenu } = useAppSelector((store) => store.app);
  const { user } = useAppSelector((store) => store.user);

  const offsetValue = React.useRef(new Animated.Value(0)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;

  const currentPath = pathname.split("/")[1];

  const handleLogout = () => {
    clearData("token");
    dispatch(userActions.setUser({ user: null }));
    dispatch(clubActions.setClub({ club: null }));
    dispatch(membersActions.setMembers({ members: null }));
    dispatch(membershipActions.setMembership({ membership: null }));
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
    <View style={tw`flex-1 bg-[#EAEAEA]`}>
      <View style={tw`relative flex-1 p-4 mr-[${screenWidth - 230}px]`}>
        <IconButton
          style={tw`absolute right-0`}
          icon="close"
          onPress={() => dispatch(appActions.setVisibleDrawerMenu(false))}
        />
        <View style={tw`items-center pt-10`}>
          <View
            style={tw`flex-col justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-2 overflow-hidden`}
          >
            {user?.avatar ? (
              <Image
                source={UPLOAD_URI + user.avatar}
                style={tw`w-20 h-20`}
                placeholder="logo"
              />
            ) : (
              <FontAwesome name="user" color={"#8E8E8E"} size={32} />
            )}
          </View>
          <Text variant="titleSmall">{user?.username}</Text>
          <Text variant="bodySmall" style={tw`text-[#808080]`}>
            {user?.email}
          </Text>
        </View>
        <View style={tw`flex-1 mt-8`}>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/home")}
            mode="contained"
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={currentPath === "home" ? "#FFFFFF" : colors.bgColor}
            buttonColor={
              currentPath === "home" ? colors.bgColor : "transparent"
            }
          >
            Dashboard
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/chat")}
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={currentPath === "chat" ? "#FFFFFF" : colors.bgColor}
            buttonColor={
              currentPath === "chat" ? colors.bgColor : "transparent"
            }
          >
            Chat
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/club")}
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={currentPath === "club" ? "#FFFFFF" : colors.bgColor}
            buttonColor={
              currentPath === "club" ? colors.bgColor : "transparent"
            }
          >
            Club
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/profile")}
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={currentPath === "profile" ? "#FFFFFF" : colors.bgColor}
            buttonColor={
              currentPath === "profile" ? colors.bgColor : "transparent"
            }
          >
            Profil
          </Button>
          <Button
            onPress={() => router.push("/(app)/(dashboard)/community")}
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={currentPath === "community" ? "#FFFFFF" : colors.bgColor}
            buttonColor={
              currentPath === "community" ? colors.bgColor : "transparent"
            }
          >
            Community
          </Button>
        </View>
        <View>
          <Button
            onPress={handleLogout}
            style={tw`rounded-lg ml-0 mr-0`}
            textColor={false ? "#FFFFFF" : colors.bgColor}
          >
            Log out
          </Button>
        </View>
      </View>
      <Animated.View
        style={tw.style(`flex-1 flex absolute top-0 bottom-0 left-0 right-0`, {
          transform: [{ translateX: offsetValue }],
        })}
      >
        <Animated.View
          style={tw.style("flex-1", {
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          })}
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
