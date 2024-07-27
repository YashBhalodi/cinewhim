import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface RatingViewProps {
  rating: number;
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

const RatingView = (props: RatingViewProps) => {
  const { rating } = props;

  const ratingType = rating > 7 ? "good" : rating < 5 ? "bad" : "neutral";

  return (
    <ThemedView style={styles.container}>
      <ThemedIcon
        name="star"
        size="xs"
        variant={RATING_STYLE_MAP[ratingType].iconColor}
      />
      <ThemedText type="body3" color={RATING_STYLE_MAP[ratingType].textColor}>
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
