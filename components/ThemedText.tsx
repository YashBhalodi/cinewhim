import { Text, type TextProps, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  type?:
    | "body1"
    | "body2"
    | "body3"
    | "heading1"
    | "heading2"
    | "heading3"
    | "label1"
    | "label2"
    | "label3";
  color?:
    | "textDefault"
    | "textSubtle"
    | "textRed"
    | "textGreen"
    | "textNeutral";
};

export function ThemedText({
  style,
  type = "body1",
  color = "textDefault",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: Colors.dark[color] },
        styles[type] ? styles[type] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  body3: {
    fontSize: 12,
    lineHeight: 16,
  },
  heading1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 700,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 700,
  },
  label1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
  },
  label2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
  },
  label3: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
  },
});
