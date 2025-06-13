import "./MovieCard.css";
import Modal from "./Modal";
import { Heart, Video } from "lucide-react";

const MovieCard = ({
  movie,
  isFavorite,
  isWatched,
  onFavoriteToggle,
  onWatchedToggle,
}) => {
  const handleFavoriteClick = (e) => {
    onFavoriteToggle(movie.id);
  };
  const handleWatchedClick = (e) => {
    onWatchedToggle(movie.id);
  };

  return (
    <>
      <img
        alt={`${movie.title} poster`}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/movie.png"
        }
      ></img>
      <h3>{movie.title}</h3>
      <p><b>Rating: </b>{movie.vote_average} </p>
      <div className="icon-container">
        <button
          className={`icon-button ${isFavorite ? "favorite" : ""}`}
          onClick={handleFavoriteClick}
        >
          <Heart />
        </button>
        <button
          className={`icon-button ${isWatched ? "watched" : ""}`}
          onClick={handleWatchedClick}
        >
          <Video />
        </button>
      </div>
      <Modal movie={movie} />
    </>
  );
};

export default MovieCard;
