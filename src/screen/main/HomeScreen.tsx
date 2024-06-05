import React from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "@/store/hook";
import { ClubCard, Container } from "@/components";
import { clubCardData } from "@/lib/constant";
import { isEmpty } from "@/lib/function";

const HomeScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      {!isEmpty(user?.club) ? (
        user?.role === "owner" ? (
          <Container>
            <Text>Owner</Text>
          </Container>
        ) : (
          <Container>
            <Text>Member</Text>
          </Container>
        )
      ) : (
        <View className="flex flex-col px-5">
          {clubCardData.map((item, key) => (
            <ClubCard
              key={key}
              title={item.title}
              icon={item.icon}
              content={item.content}
              btnIcon={item.btnIcon}
              btnText={item.btnText}
              route={item.route}
            />
          ))}
        </View>
      )}
    </>
  );
};

export default HomeScreen;
