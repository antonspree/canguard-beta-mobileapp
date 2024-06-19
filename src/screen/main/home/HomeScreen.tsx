import React from "react";
import { View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { ClubCard } from "@/components";
import { clubCardData } from "@/lib/constant";
import { isEmpty } from "@/lib/function";
import OwnerScreen from "./OwnerScreen";
import MemberScreen from "./MemberScreen";

const HomeScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      {!isEmpty(user?.club) ? (
        user?.role === "owner" ? (
          <OwnerScreen />
        ) : (
          <MemberScreen />
        )
      ) : (
        <View className="flex flex-col space-y-5 m-5">
          {clubCardData.map((item, key) => (
            <View key={key}>
              <ClubCard
                title={item.title}
                icon={item.icon}
                content={item.content}
                btnIcon={item.btnIcon}
                btnText={item.btnText}
                route={item.route}
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default HomeScreen;
