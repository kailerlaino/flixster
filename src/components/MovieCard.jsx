import "./MovieCard.css";

const MovieCard = ( {id, movie} ) => {

  return (
    <>
      <img alt={`${movie.title} poster`} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "public/movie.png" } ></img>
      <h3>{movie.title}</h3>
      <p>{movie.vote_average} </p>
    </>
  );
};

export default MovieCard;
