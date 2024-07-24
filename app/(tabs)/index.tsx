import { useFeedInfinityQuery } from "@/api/hooks";
import { ThemedText } from "@/components/ThemedText";
import _ from "lodash";
import { FlatList, StyleSheet } from "react-native";

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
        <ThemedText style={{ paddingVertical: 16 }}>{item.title}</ThemedText>
      )}
      keyExtractor={({ id }) => id.toString()}
      contentInsetAdjustmentBehavior="automatic"
      onEndReached={() => {
        if (!isFetchingNextPage && hasNextPage) fetchNextPage();
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
