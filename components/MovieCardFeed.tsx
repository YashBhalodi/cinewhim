import { Movie } from "@/api/model";
import MovieCard from "@/components/MovieCard";
import { Link } from "expo-router";
import { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";

interface MovieCardFeedProps {
  movies: Movie[];
  onLoadMore: () => void;
  isLoadingMore?: boolean;
}

const MovieCardFeed = (props: MovieCardFeedProps) => {
  const { movies, onLoadMore, isLoadingMore = false } = props;

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <View style={styles.listItemContainer}>
        <Link href={`/movie/${item.id}`} asChild>
          <MovieCard movie={item} />
        </Link>
      </View>
    ),
    []
  );

  const keyExtractor: (item: Movie, index: number) => string = useCallback(
    ({ id }) => id.toString(),
    []
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      onEndReached={onLoadMore}
      contentContainerStyle={styles.listContentContainer}
      ListFooterComponent={() => {
        if (isLoadingMore) {
          return (
            <View style={{ flexDirection: "row" }}>
              <ThemedView
                style={[styles.loadingItemContainer, styles.listItemContainer]}
              />
              <ThemedView
                style={[styles.loadingItemContainer, styles.listItemContainer]}
              />
            </View>
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    marginHorizontal: -4,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  listItemContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  loadingItemContainer: {
    aspectRatio: 1 / 1.5,
    borderRadius: 8,
  },
});

export default MovieCardFeed;
