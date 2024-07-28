export const getRuntimeText = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}min`;
};

export const getReleaseDateText = (releaseDate: string) => {
  return new Date(releaseDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
