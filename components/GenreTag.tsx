import { StyleSheet } from "react-native";
import React from "react";
import { Genre } from "@/api/model";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

interface GenreTagProps {
  genre: Genre;
}

const GenreTag = (props: GenreTagProps) => {
  const { genre } = props;

  return (
    <ThemedView style={styles.container}>
      <ThemedText>{genre.name}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default GenreTag;
