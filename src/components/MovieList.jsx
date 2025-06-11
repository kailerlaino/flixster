import { useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading }) => {
  
  if (loading && movies.length === 0) {
    return (
      <>
        <p>loading</p>
      </>
    )
  }

  if (movies.length === 0) {
    return (
      <>
        <p>No movies Found</p>
      </>
    )
  }
  return (
    <>
      <section className="movie-list">
        {movies.map((movie) => (
          <article className="movie-card" key={movies.id}>
            <MovieCard
              id={movie.id}
              movie={movie}
            />
          </article>
        ))}
      </section>
    </>
  );
};

export default MovieList;
