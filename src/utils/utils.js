const parseMovieData = (movieData) => {
  if (!movieData) {
    throw new Error("Invalid Movie Data");
  }
  return movieData.results.map((data) => ({
    id: data.id,
    title: data.title,
    vote_average: data.vote_average,
    poster_path: data.poster_path,
  }));
};

export { parseMovieData };
