import React, { useState, useEffect } from "react";
import "./Modal.css";
export default function Modal({ movie }) {
  const [modal, setModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [videoKey, setVideoKey] = useState(null)

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  // TODO: attempt to fetch genre details
  useEffect(() => {
    fetchGenres();
    fetchVideos();
  }, [movie]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&?language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres)
    } catch (error) {
      console.error("Error obtaining movie details:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&?language=en-US`
      );
      const data = await response.json();
      const trailer = data.results?.find((video) => video.type === "Trailer" && video.site === "YouTube")
      setVideoKey(trailer?.key || null)
    } catch (error) {
      console.error("Error obtaining movie details:", error);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{movie.title}</h2>
            <img
              alt={`${movie.title} poster`}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "public/movie.png"
              }
            ></img>
            <p>
              <b>Release Date:</b> {movie.release_date}
            </p>
            <p>
              <b>Overview:</b> {movie.overview}
            </p>
            <p>
              <b>Genre(s)</b>{" "}
            </p>
              {genres && genres.length > 0 && (
                <div>
                  {genres.map((genre) => (
                    <p key={genre.id}>
                      {genre.name}
                    </p>
                  ))}
                  </div>
              )}

              {videoKey && (
                <div>
                  <iframe 
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  />
                  </div>
              )}
            
            {/* Need to grab genres from movie details API */}
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
