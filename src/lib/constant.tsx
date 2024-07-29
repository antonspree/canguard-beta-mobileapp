import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ClubCardPropsInterface } from "@/types/component";

export const clubCardData: ClubCardPropsInterface[] = [
  {
    title: "Club erstellen",
    icon: <FontAwesome name="home" size={24} color="#19A873" />,
    content:
      "Erstelle deinen eigenen Cannabis Social Club in wenigen Sekunden und lade die ersten Mitglieder ein.",
    btnText: "Club erstellen",
    btnIcon: <FontAwesome name="plus" size={14} color="#ffffff" />,
    route: "/club/create",
  },
  {
    title: "Social Club finden",
    icon: <FontAwesome name="search" size={24} color="#19A873" />,
    content:
      "Finde Social Clubs in Deutschland, stelle eine Mitgliedsanfrage und werde Mitglied.",
    btnText: "Clubs suchen",
    btnIcon: <FontAwesome name="search" size={14} color="#ffffff" />,
    route: "/club/search",
  },
];

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
};
