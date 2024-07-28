import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { ComponentProps, useCallback } from "react";
import { ThemedIcon, ThemedIconProps } from "./ThemedIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IconButtonProps {
  iconProps: ThemedIconProps;
  onPress?: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { onPress, iconProps } = props;
  const scale = useSharedValue<number>(1);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: withTiming(scale.value) }],
    }),
    []
  );

  const onPressIn = useCallback(() => {
    scale.value = 0.9;
  }, []);
  const onPressOut = useCallback(() => {
    scale.value = 1.0;
  }, []);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, animatedStyle]}
    >
      <ThemedIcon {...iconProps} />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default IconButton;
