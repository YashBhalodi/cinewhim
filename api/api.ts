export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
export const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

const header = {
  accept: "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

const apiBaseUrl = `https://api.themoviedb.org/3`;
const imagesBaseUrl = "https://image.tmdb.org/t/p";

export const fetchNowPlaying = async ({ page = 1 }): Promise<any> => {
  const options = {
    method: "GET",
    headers: header,
  };

  const response = await fetch(
    `${apiBaseUrl}/movie/now_playing?language=en-US&page=${page}`,
    options
  );

  return await response.json();
};

export const getImageUrl = (fileId: string): string => {
  return `${imagesBaseUrl}/original/${fileId}`;
};
