import { Colors } from "@/constants/Colors";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = Colors.dark.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
