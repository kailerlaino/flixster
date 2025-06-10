import { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  function fetchData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzE2MDE1MmJkZmY0NzdhZDdjOTUwMGIzZjEyMWM3MCIsIm5iZiI6MTc0OTU3NDU5My42LCJzdWIiOiI2ODQ4NjNjMTdmM2RlZjZmODEzMDIwNmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZBgBkA_6jjfAXW_9up86gYcO9bES8QRwWsA6fbUom90",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => setNowPlaying(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="movie-list">
      <MovieCard />
    </div>
  );
};

export default MovieList;
