import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ movie }) {
  const [modal, setModal] = useState(false);
  const [genres, setGenres] = useState([]);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  // TODO: attempt to fetch genre details
  // useEffect(() => {
  //   fetchDetails();
  // }, []);

  // const fetchDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_API_KEY}?language=en-US`
  //     );
  //     const data = await response.json();
  //     setGenres(data.genres)
  //     // setSearchResults(data);
  //   } catch (error) {
  //     console.error("Error obtaining movie details:", error);
  //   }
  // };

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
