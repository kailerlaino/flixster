import { useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  loading,
  favorites,
  watched,
  onFavoriteToggle,
  onWatchedToggle,
}) => {
  if (loading && movies.length === 0) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <p>No movies Found</p>
      </>
    );
  }
  return (
    <>
      <section className="movie-list">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <MovieCard
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              isWatched={watched.includes(movie.id)}
              onFavoriteToggle={onFavoriteToggle}
              onWatchedToggle={onWatchedToggle}
            />
          </article>
        ))}
      </section>
    </>
  );
};

export default MovieList;
