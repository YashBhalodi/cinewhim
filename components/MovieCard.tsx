import { getImageUrl } from "@/api/api";
import { Movie } from "@/api/model";
import { ImageBackground } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import RatingView from "./RatingView";
import { ThemedText } from "./ThemedText";
import { getReleaseDateText } from "@/utils/formattingUtils";

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard = (props: MovieCardProps) => {
  const { movie, onPress } = props;

  const scale = useSharedValue<number>(1);
  const opacity = useSharedValue<number>(1);

  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      borderRadius: 8,
      overflow: "hidden" as "hidden",
      transform: [{ scale: withTiming(scale.value, { duration: 100 }) }],
    }),
    []
  );

  const titleContainerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(opacity.value, { duration: 300 }),
    }),
    []
  );

  const onPressIn = () => {
    scale.value = 0.95;
  };
  const onPressOut = () => {
    scale.value = 1;
  };

  return (
    <Pressable
      style={styles.outerContainer}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Animated.View style={containerAnimatedStyle}>
        <ImageBackground
          style={styles.posterImage}
          source={getImageUrl(movie.poster_path)}
          contentFit="cover"
          contentPosition="left center"
          onLoadEnd={() => {
            opacity.value = 0;
          }}
          onError={() => {
            opacity.value = 1;
          }}
        >
          <View style={styles.ratingContainer}>
            <RatingView rating={movie.vote_average} size="sm" />
          </View>
          <View style={styles.dateContainer}>
            <ThemedText type="label3" color={"textSubtle"}>
              {getReleaseDateText(movie.release_date)}
            </ThemedText>
          </View>

          <Animated.View
            style={[styles.titleContainer, titleContainerAnimatedStyle]}
          >
            <ThemedText type="heading3">{movie.title}</ThemedText>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerContainer: { borderRadius: 8, overflow: "hidden" },
  posterImage: {
    aspectRatio: 1 / 1.5,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  dateContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "rgba(256,256,256,0.3)",
  },
  titleContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    gap: 4,
  },
});

export default MovieCard;
