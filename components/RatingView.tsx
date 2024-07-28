import React from "react";
import { StyleSheet } from "react-native";
import { ThemedIcon, ThemedIconProps } from "./ThemedIcon";
import { ThemedText, ThemedTextProps } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Size = "sm" | "md" | "lg";

interface RatingViewProps {
  rating: number;
  voteCount: number;
  size: Size;
}

const RATING_STYLE_MAP = {
  good: {
    iconColor: "iconGreen" as "iconGreen",
    textColor: "textGreen" as "textGreen",
  },
  neutral: {
    iconColor: "iconNeutral" as "iconNeutral",
    textColor: "textNeutral" as "textNeutral",
  },
  bad: {
    iconColor: "iconRed" as "iconRed",
    textColor: "textRed" as "textRed",
  },
};

const SIZE_MAP: Record<
  Size,
  { iconSize: ThemedIconProps["size"]; textType: ThemedTextProps["type"] }
> = {
  sm: {
    iconSize: "xs",
    textType: "body3",
  },
  md: {
    iconSize: "sm",
    textType: "body2",
  },
  lg: {
    iconSize: "md",
    textType: "body1",
  },
};

const RatingView = (props: RatingViewProps) => {
  const { rating, voteCount, size = "md" } = props;

  const ratingType = rating > 7 ? "good" : rating < 5 ? "bad" : "neutral";

  if (voteCount !== undefined && voteCount === 0) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedIcon
        name="star"
        size={SIZE_MAP[size].iconSize}
        variant={RATING_STYLE_MAP[ratingType].iconColor}
      />
      <ThemedText
        type={SIZE_MAP[size].textType}
        color={RATING_STYLE_MAP[ratingType].textColor}
      >
        {rating.toPrecision(2)}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "rgba(256,256,256,0.3)",
  },
});

export default RatingView;
