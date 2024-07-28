import { useFeedInfinityQuery } from "@/api/hooks";
import ErrorScreen from "@/components/ErrorScreen";
import Loader from "@/components/Loader";
import MovieCardFeed from "@/components/MovieCardFeed";
import { ThemedText } from "@/components/ThemedText";

export default function Upcoming() {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useFeedInfinityQuery("upcoming");

  if (isLoading) {
    return <Loader componentKey="movie_feed" />;
  }

  if (error || !data) {
    return <ErrorScreen componentKey="movie_feed" error={error} />;
  }
  const loadMoreMovies = () => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage();
  };

  return (
    <MovieCardFeed
      movies={data}
      onLoadMore={loadMoreMovies}
      isLoadingMore={isFetchingNextPage}
    />
  );
}
