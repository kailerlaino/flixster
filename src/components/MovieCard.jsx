import "./MovieCard.css";

const MovieCard = ( {id, movie} ) => {

  return (
    <div className="movie-card">
      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "public/movie.png"}></img>
      <h3>Title: {movie.title}</h3>
      <p>Average: {movie.vote_average} </p>
    </div>
  );
};

export default MovieCard;
