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
