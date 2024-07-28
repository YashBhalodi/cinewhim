import { useFeedInfinityQuery } from "@/api/hooks";
import ErrorScreen from "@/components/ErrorScreen";
import Loader from "@/components/Loader";
import MovieCardFeed from "@/components/MovieCardFeed";

export default function Popular() {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useFeedInfinityQuery("popular");

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
