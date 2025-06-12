import "./MovieCard.css";
import Modal from "./Modal"
import { Heart, Video } from 'lucide-react';


const MovieCard = ( {id, movie} ) => {

  return (
    <>
      <img alt={`${movie.title} poster`} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "public/movie.png" } ></img>
      <h3>{movie.title}</h3>
      <p>{movie.vote_average} </p>
      <div className="icon-container">
        <Heart className="heart"/>
        <Video className="video"/>
      </div>
      <Modal movie={movie}/>
    </>
  );
};

export default MovieCard;
