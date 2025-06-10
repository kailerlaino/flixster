import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { parseMovieData } from "../utils/utils";

const MovieList = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {

    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`);
    const data = await response.json();
    setNowPlaying(data);
    setPage(prevPage => prevPage + 1)

  };

  const fetchMoreData = async () => {    
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`);
    const data = await response.json();
    setNowPlaying(prevData => ({
      ...prevData,
      results: [
        ...(prevData?.results || []),
        ...data.results
      ]
    }));
    setPage(prevPage => prevPage + 1)

  };

  useEffect(() => {
    fetchData();
  }, []);

  const parsedData = nowPlaying ? parseMovieData(nowPlaying) : [];

  return (
    <>
      <div className="movie-list">
        {parsedData.map((movie) => (
          <div className="movie-card" key={parsedData.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
            />
          </div>
        ))}
      </div>
      <button onClick={fetchMoreData}>Load more</button>
    </>
  );
};

export default MovieList;
