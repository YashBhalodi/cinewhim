import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCollectionMovies,
  getMovieDetail,
  getMovieFeedPromise,
  getMovieRecommendationFeedPromise,
} from "./api";
import _ from "lodash";
import { FeedType, Movie, SearchResult } from "./model";

const FeedTypeQueryMap: Record<
  FeedType,
  (page: number) => Promise<SearchResult<Movie>>
> = {
  now_playing: getMovieFeedPromise("now_playing"),
  popular: getMovieFeedPromise("popular"),
  top_rated: getMovieFeedPromise("top_rated"),
  upcoming: getMovieFeedPromise("upcoming"),
};

export const useFeedInfinityQuery = (feedType: FeedType) => {
  return useInfiniteQuery({
    queryKey: [feedType],
    queryFn: ({ pageParam }) => FeedTypeQueryMap[feedType](pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page >= lastPage.total_pages ? null : lastPage.page + 1;
    },
    initialPageParam: 1,
    select: (data): Movie[] =>
      _.uniqBy(_.flatten(_.map(data.pages, "results")), "id"),
  });
};

export const useMovieDetailQuery = (movieId: string) => {
  return useQuery({
    queryKey: [`movie::${movieId}`],
    queryFn: () => getMovieDetail(movieId),
  });
};

export const useCollectionDetailsQuery = (collectionId: number) => {
  return useQuery({
    queryKey: [`collection::${collectionId}`],
    queryFn: () => getCollectionMovies(collectionId),
  });
};

export const useRecommendationFeedQuery = (movieId: number) => {
  return useInfiniteQuery({
    queryKey: [`recommendation::${movieId}`],
    queryFn: ({ pageParam }) =>
      getMovieRecommendationFeedPromise(movieId)(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page >= lastPage.total_pages ? null : lastPage.page + 1;
    },
    initialPageParam: 1,
    select: (data): Movie[] =>
      _.uniqBy(_.flatten(_.map(data.pages, "results")), "id"),
  });
};
