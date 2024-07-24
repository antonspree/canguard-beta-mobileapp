import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
  descWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#919191",
  },
  signupLink: {
    fontWeight: "semibold",
    fontSize: 16,
    color: "#19A873",
    textDecorationLine: "underline",
  },
  contentWrapper: {
    flex: 1,
  },
	errorMsg: {
		margin: 4,
	}
});
