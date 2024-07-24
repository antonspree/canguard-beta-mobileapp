import { Container } from "@/components";
import MemberFee from "@/components/members/fee";
import MemberInvite from "@/components/members/invite";
import MemberManage from "@/components/members/manage";
import MemberRole from "@/components/members/role";
import { View, Text } from "react-native";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import React = require("react");

type MemberPageType = "manage" | "invite" | "fee" | "role";

const Members: React.FC = () => {
  const [value, setValue] = React.useState<MemberPageType>("manage");

  return (
    <Container>
      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs>
          <TabScreen label="Mitglieder" icon="compass">
            <MemberManage />
          </TabScreen>
          <TabScreen label="Einladen" icon="airplane" disabled>
            <View style={{ backgroundColor: "black", flex: 1 }} />
          </TabScreen>
          <TabScreen
            label="Trips"
            icon="bag-suitcase"
            // optional props
            // badge={true} // only show indicator
            // badge="text"
            // badge={1}
            // onPressIn={() => {
            //   console.log('onPressIn explore');
            // }}
            // onPress={() => {
            //   console.log('onPress explore');
            // }}
          >
            <View style={{ backgroundColor: "red", flex: 1 }} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </Container>
  );
};

export default Members;
