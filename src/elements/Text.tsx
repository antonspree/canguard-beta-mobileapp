import React from "react";
import { Text as NativePaperText } from "react-native-paper";

interface TextProps extends React.ComponentProps<typeof NativePaperText> {
  font:
    | "Inter_100Thin"
    | "Inter_200ExtraLight"
    | "Inter_300Light"
    | "Inter_400Regular"
    | "Inter_500Medium"
    | "Inter_600SemiBold"
    | "Inter_700Bold"
    | "Inter_800ExtraBold"
    | "Inter_900Black";
}

export default function Text(
  props: React.ComponentProps<typeof NativePaperText>
) {
  return (
    <NativePaperText
      {...props}
      style={[
        {
          fontFamily: "Inter_500Medium",
        },
        props.style,
      ]}
    />
  );
}
