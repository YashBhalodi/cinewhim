import { Text, type TextProps, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type ThemedTextProps = Omit<
  ComponentProps<typeof FontAwesome>,
  "color" | "size"
> & {
  variant?: "iconDefault" | "iconSubtle" | "iconCritical";
  size?: "sm" | "md" | "lg" | "xlg";
};

const SIZE_MAP = {
  sm: 16,
  md: 20,
  lg: 24,
  xlg: 28,
};

export function ThemedIcon({
  variant = "iconDefault",
  size = "md",
  ...rest
}: ThemedTextProps) {
  const color = Colors.dark[variant];

  return <FontAwesome {...rest} color={color} size={SIZE_MAP[size]} />;
}
