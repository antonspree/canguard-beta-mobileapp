import React from "react";
import { CreateClubScreen } from "@/screens/dashboard/home";
import { Container } from "@/components";
import DetailContainer from "@/components/DetailContainer";

const CreateClub: React.FC = () => {
  return (
    <DetailContainer title="Create a club" backLink="/dashboard">
      <CreateClubScreen />
    </DetailContainer>
  );
};

export default CreateClub;
