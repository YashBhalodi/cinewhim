export type FeedType = "now_playing" | "popular" | "top_rated" | "upcoming";

export type IDate = string;

export interface Company {
  id: number;
  logo_path: string;
  name: string;
}
export interface Country {
  iso_3166_1: string;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface Keyword {
  id: number;
  name: string;
}
export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Network {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: IDate;
  genre_ids: number[];
  original_language: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Collection {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
}

interface CollectionDetails extends Collection {
  overview: string;
  parts: Movie[];
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  adult: boolean;
  popularity: number;
  known_for: Array<Movie | TvShow>;
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: IDate;
  deathday: IDate;
  gender: number;
  homepage: string;
  imdb_id: string;
  place_of_birth: string;
}

export interface SearchResult<T> {
  page: number;
  results: Array<T>;
  total_results: number;
  total_pages: number;
}

export interface Season {
  id: number;
  episode_count: number;
  poster_path: string;
  season_number: number;
  air_date: IDate;
}

export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  popularity: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  first_air_date: IDate;
}

export interface TvShowDetails extends TvShow {
  created_by: Person[] = [];
  episode_run_time: number[] = [];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[] = [];
  networks: Network[] = [];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Company[] = [];
  seasons: Season[] = [];
  status: string;
  type: string;
  last_air_date: IDate;
}
