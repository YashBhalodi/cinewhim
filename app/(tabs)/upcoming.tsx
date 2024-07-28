import { useFeedInfinityQuery } from "@/api/hooks";
import { ErrorScreen, Loader, MovieCardFeed } from "@/components";

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
