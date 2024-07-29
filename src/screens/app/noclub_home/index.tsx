import ClubCard from "@/components/ClubCard";
import { clubCardData } from "@/lib/constant";
import React from "react";
import { View } from "react-native";

const NoClubHome = () => {
  return (
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
  );
};

export default NoClubHome;
