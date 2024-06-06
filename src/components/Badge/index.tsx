import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";
import { BadgeProps } from "@/types/component";

const badgeVariants = (variant: string) => {
  switch (variant) {
    case "default":
      return "border-transparent bg-[#18181B] text-[#FAFAFA]";
    case "secondary":
      return "border-transparent bg-[#F4F4F5] text-[#18181B]";
    case "destructive":
      return "border-transparent bg-red-500 text-[#FAFAFA]";
    case "outline":
      return "text-[#09090B]";
  }
};

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
}) => {
  return (
    <View
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5",
        badgeVariants(variant),
        className
      )}
    >
      <Text className="text-xs font-semibold">{children}</Text>
    </View>
  );
};

export default Badge;
