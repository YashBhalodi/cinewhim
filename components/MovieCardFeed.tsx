import { Movie } from "@/api/model";
import { Link } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedView from "./ThemedView";
import MovieCard from "./MovieCard";

interface MovieCardFeedProps
  extends Omit<FlatListProps<Movie>, "data" | "renderItem"> {
  movies: Movie[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isHorizontal?: boolean;
}

const MovieCardFeed = (props: MovieCardFeedProps) => {
  const {
    movies,
    onLoadMore,
    isLoadingMore = false,
    isHorizontal = false,
    ...rest
  } = props;
  const { top } = useSafeAreaInsets();

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.listItemContainer,
          isHorizontal ? styles.horizontalListItemContainer : undefined,
        ]}
      >
        <Link href={`/movie/${item.id}`} push asChild>
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
      horizontal={isHorizontal}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={isHorizontal ? undefined : 2}
      contentInsetAdjustmentBehavior="automatic"
      onEndReached={onLoadMore}
      contentContainerStyle={[
        styles.listContentContainer,
        isHorizontal
          ? styles.horizontalListContentContainer
          : { paddingTop: top + 72 },
      ]}
      style={isHorizontal ? styles.horizontalListStyle : undefined}
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
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  horizontalListStyle: { flexGrow: 0 },
  listContentContainer: {
    marginHorizontal: -4,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  horizontalListContentContainer: { paddingHorizontal: 4 },
  listItemContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  horizontalListItemContainer: {
    flex: undefined,
    width: 200,
    aspectRatio: 1 / 1.5,
  },
  loadingItemContainer: {
    aspectRatio: 1 / 1.5,
    borderRadius: 8,
  },
});

export default MovieCardFeed;
