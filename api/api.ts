import { FeedType, Movie, SearchResult } from "./model";

export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
export const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const header = {
  accept: "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

const apiBaseUrl = `https://api.themoviedb.org/3`;
const imagesBaseUrl = "https://image.tmdb.org/t/p";

const getRequestOptions = {
  method: "GET",
  headers: header,
};

const FEED_ENDPOINT: Record<FeedType, string> = {
  now_playing: "now_playing",
  popular: "popular",
  top_rated: "top_rated",
  upcoming: "upcoming",
};

export const getMovieFeedPromise = (feedType: FeedType) => {
  return async (page = 1): Promise<SearchResult<Movie>> => {
    const response = await fetch(
      `${apiBaseUrl}/movie/${FEED_ENDPOINT[feedType]}?language=en-US&page=${page}`,
      getRequestOptions
    );

    return await response.json();
  };
};

export const getImageUrl = (fileId: string): string => {
  return `${imagesBaseUrl}/original/${fileId}`;
};