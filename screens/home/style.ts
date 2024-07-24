import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  linearBackground: {
    display: "flex",
    justifyContent: "flex-end",
    height: "66.6%",
  },
  contents: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 40,
    paddingBottom: 96,
  },
  contentHeader: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#ffffff",
  },
  contentDesc: {
    fontSize: 16,
    color: "#ffffff",
  },
  contentButton: {
    backgroundColor: "#19A873",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  contentButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
  },
});
