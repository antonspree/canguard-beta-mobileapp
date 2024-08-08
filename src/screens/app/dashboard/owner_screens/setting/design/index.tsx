import React from "react";
import { View } from "react-native";
import ClubColor from "./ClubColor";
import Container from "@/components/Container";
import MemberCard from "./MemberCard";

const DesignScreen = () => {
  return (
    <Container>
      <View className="px-5">
        <ClubColor />
        <MemberCard />
      </View>
    </Container>
  );
};

export default DesignScreen;
