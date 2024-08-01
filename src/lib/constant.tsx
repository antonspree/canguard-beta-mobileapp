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

export const colorData = [
  {
    name: "light",
    bgColor: "bg-[#19A873]",
    borderColor: "border-[#19A873]/25",
  },
  {
    name: "grey",
    bgColor: "bg-[#989898]",
    borderColor: "border-[#989898]/25",
  },
  {
    name: "red",
    bgColor: "bg-[#D14A4A]",
    borderColor: "border-[#D14A4A]/25",
  },
  {
    name: "orange",
    bgColor: "bg-[#F1873B]",
    borderColor: "border-[#F1873B]/25",
  },
  {
    name: "yellow",
    bgColor: "bg-[#DBEB7B]",
    borderColor: "border-[#DBEB7B]/25",
  },
  {
    name: "lime",
    bgColor: "bg-[#66ECB4]",
    borderColor: "border-[#66ECB4]/25",
  },
  {
    name: "teal",
    bgColor: "bg-[#6ECB88]",
    borderColor: "border-[#6ECB88]/25",
  },
  {
    name: "cyan",
    bgColor: "bg-[#4CB8E6]",
    borderColor: "border-[#4CB8E6]/25",
  },
  {
    name: "sky",
    bgColor: "bg-[#3A93B9]",
    borderColor: "border-[#3A93B9]/25",
  },
  {
    name: "violet",
    bgColor: "bg-[#744CE6]",
    borderColor: "border-[#744CE6]/25",
  },
  {
    name: "purple",
    bgColor: "bg-[#6A3AB9]",
    borderColor: "border-[#6A3AB9]/25",
  },
  {
    name: "pink",
    bgColor: "bg-[#E64C83]",
    borderColor: "border-[#E64C83]/25",
  },
  {
    name: "fuchsia",
    bgColor: "bg-[#B93AA5]",
    borderColor: "border-[#B93AA5]/25",
  },
];

export const cardBGColorData = [
  {
    name: "white",
    bgColor: "bg-white",
    borderColor: "border-[#C8C8C8]/25",
  },
  {
    name: "black",
    bgColor: "bg-black",
    borderColor: "border-black/25",
  },
  {
    name: "green",
    bgColor: "bg-[#19A873]",
    borderColor: "border-[#19A873]/25",
  },
  {
    name: "grey",
    bgColor: "bg-[#989898]",
    borderColor: "border-[#989898]/25",
  },
  {
    name: "red",
    bgColor: "bg-[#D14A4A]",
    borderColor: "border-[#D14A4A]/25",
  },
  {
    name: "orange",
    bgColor: "bg-[#F1873B]",
    borderColor: "border-[#F1873B]/25",
  },
  {
    name: "yellow",
    bgColor: "bg-[#DBEB7B]",
    borderColor: "border-[#DBEB7B]/25",
  },
  {
    name: "lime",
    bgColor: "bg-[#66ECB4]",
    borderColor: "border-[#66ECB4]/25",
  },
  {
    name: "teal",
    bgColor: "bg-[#6ECB88]",
    borderColor: "border-[#6ECB88]/25",
  },
  {
    name: "cyan",
    bgColor: "bg-[#4CB8E6]",
    borderColor: "border-[#4CB8E6]/25",
  },
  {
    name: "sky",
    bgColor: "bg-[#3A93B9]",
    borderColor: "border-[#3A93B9]/25",
  },
  {
    name: "violet",
    bgColor: "bg-[#744CE6]",
    borderColor: "border-[#744CE6]/25",
  },
  {
    name: "purple",
    bgColor: "bg-[#6A3AB9]",
    borderColor: "border-[#6A3AB9]/25",
  },
  {
    name: "pink",
    bgColor: "bg-[#E64C83]",
    borderColor: "border-[#E64C83]/25",
  },
  {
    name: "fuchsia",
    bgColor: "bg-[#B93AA5]",
    borderColor: "border-[#B93AA5]/25",
  },
];

export const cardTextColorData = [
  {
    name: "white",
    textColor: "text-white",
    bgColor: "bg-white",
    borderColor: "border-[#C8C8C8]/25",
  },
  {
    name: "black",
    textColor: "text-black",
    bgColor: "bg-black",
    borderColor: "border-black/25",
  },
  {
    name: "grey",
    textColor: "text-[#989898]",
    bgColor: "bg-[#989898]",
    borderColor: "border-[#989898]/25",
  },
  {
    name: "green",
    textColor: "text-[#19A873]",
    bgColor: "bg-[#19A873]",
    borderColor: "border-[#19A873]/25",
  },
  {
    name: "red",
    textColor: "text-[#D14A4A]",
    bgColor: "bg-[#D14A4A]",
    borderColor: "border-[#D14A4A]/25",
  },
  {
    name: "orange",
    textColor: "text-[#F1873B]",
    bgColor: "bg-[#F1873B]",
    borderColor: "border-[#F1873B]/25",
  },
  {
    name: "yellow",
    textColor: "text-[#DBEB7B]",
    bgColor: "bg-[#DBEB7B]",
    borderColor: "border-[#DBEB7B]/25",
  },
  {
    name: "lime",
    textColor: "text-[#66ECB4]",
    bgColor: "bg-[#66ECB4]",
    borderColor: "border-[#66ECB4]/25",
  },
  {
    name: "teal",
    textColor: "text-[#6ECB88]",
    bgColor: "bg-[#6ECB88]",
    borderColor: "border-[#6ECB88]/25",
  },
  {
    name: "cyan",
    textColor: "text-[#4CB8E6]",
    bgColor: "bg-[#4CB8E6]",
    borderColor: "border-[#4CB8E6]/25",
  },
  {
    name: "sky",
    textColor: "text-[#3A93B9]",
    bgColor: "bg-[#3A93B9]",
    borderColor: "border-[#3A93B9]/25",
  },
  {
    name: "violet",
    textColor: "text-[#744CE6]",
    bgColor: "bg-[#744CE6]",
    borderColor: "border-[#744CE6]/25",
  },
  {
    name: "purple",
    textColor: "text-[#6A3AB9]",
    bgColor: "bg-[#6A3AB9]",
    borderColor: "border-[#6A3AB9]/25",
  },
  {
    name: "pink",
    textColor: "text-[#E64C83]",
    bgColor: "bg-[#E64C83]",
    borderColor: "border-[#E64C83]/25",
  },
  {
    name: "fuchsia",
    textColor: "text-[#B93AA5]",
    bgColor: "bg-[#B93AA5]",
    borderColor: "border-[#B93AA5]/25",
  },
];
