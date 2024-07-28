import { Text, type TextProps, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type ThemedIconProps = Omit<
  ComponentProps<typeof FontAwesome>,
  "color" | "size"
> & {
  variant?:
    | "iconDefault"
    | "iconSubtle"
    | "iconRed"
    | "iconNeutral"
    | "iconGreen";
  size?: "xs" | "sm" | "md" | "lg" | "xlg";
};

const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xlg: 28,
};

export default function ThemedIcon({
  variant = "iconDefault",
  size = "md",
  ...rest
}: ThemedIconProps) {
  const color = Colors.dark[variant];

  return <FontAwesome {...rest} color={color} size={SIZE_MAP[size]} />;
}
