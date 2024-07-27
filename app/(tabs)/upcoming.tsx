import { useFeedInfinityQuery } from "@/api/hooks";
import MovieCardFeed from "@/components/MovieCardFeed";
import { ThemedText } from "@/components/ThemedText";

export default function Upcoming() {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    useFeedInfinityQuery("upcoming");

  if (isLoading || data === undefined) {
    return <ThemedText>Loading</ThemedText>;
  }

  const loadMoreMovies = () => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage();
  };

  return <MovieCardFeed movies={data} onLoadMore={loadMoreMovies} />;
}
