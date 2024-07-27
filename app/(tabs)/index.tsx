import { useFeedInfinityQuery } from "@/api/hooks";
import MovieCard from "@/components/MovieCard";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import _ from "lodash";
import { FlatList, View } from "react-native";

export default function Tab() {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    useFeedInfinityQuery("now_playing");

  if (isLoading) {
    return <ThemedText>Loading</ThemedText>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, marginHorizontal: 4 }}>
          <Link href={`/detail/${item.id}`} asChild>
            <MovieCard movie={item} />
          </Link>
        </View>
      )}
      keyExtractor={({ id }) => id.toString()}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      onEndReached={() => {
        if (!isFetchingNextPage && hasNextPage) fetchNextPage();
      }}
      contentContainerStyle={{
        marginHorizontal: -4,
        gap: 8,
      }}
    />
  );
}
