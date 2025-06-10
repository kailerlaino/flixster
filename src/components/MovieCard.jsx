import "./MovieCard.css";

const MovieCard = ( {id, title, vote_average, poster_path} ) => {
      const imgsrc = `https://image.tmdb.org/t/p/w500${poster_path}`

  return (
    <div className="movie-card">
      <img src={imgsrc}></img>
      <h3>Title: {title}</h3>
      <p>Average: {vote_average} </p>
    </div>
  );
};

export default MovieCard;
