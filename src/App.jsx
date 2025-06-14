import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import SortForm from "./components/SortForm";
import NavBar from "./components/NavBar";
import "./App.css";

const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [sortBy, setSortBy] = useState();
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);


  useEffect(() => {
    if (currentView === "home") {
      fetchMovies();
    } else if (currentView === "favorites") {
      fetchMoviesByIds(favorites);
    } else if (currentView === "watched") {
      fetchMoviesByIds(watched);
    }
  }, [currentView, sortBy]);

  const fetchMovies = async (page = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`
      );
      const data = await response.json();
      if (append) {
        setNowPlaying((prev) => [...prev, ...data.results]);
        setFilteredMovies((prev) => [...prev, ...data.results]);
      } else {
        setNowPlaying(data.results);
        setFilteredMovies(data.results);
      }
      setCurrentPage(data.page);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, page = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`
      );
      const data = await response.json();
      if (append) {
        setFilteredMovies((prev) => [...prev, ...data.results]);
      } else {
        setFilteredMovies(data.results);
      }
      setCurrentPage(data.page);

      setQuery(query);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesByIds = async (ids) => {
    setLoading(true);
    if (ids.length == 0) {
      setFilteredMovies([]);
      setLoading(false);
      return;
    }
    try {
      const data = await Promise.all(
        ids.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&query=${query}&language=en-US`
          ).then((res) => res.json())
        )
      );

      setFilteredMovies(data.filter((movie) => movie.id));
    } catch (error) {
      console.error("Error fetching movies by IDs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    fetchMovies(1);
    setQuery(null)
  };

  const changeSortType = (type) => {
    setSortBy(type);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (query) {
      searchMovies(query, currentPage + 1, true)
    } else {
      fetchMovies(currentPage + 1, true);
    }
  };

  const handleFavoriteToggle = (movieId) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    setFavorites(newFavorites);
  };

  const handleWatchedToggle = (movieId) => {
    const newWatched = watched.includes(movieId)
      ? watched.filter((id) => id !== movieId)
      : [...watched, movieId];
    setWatched(newWatched);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <header className="banner-section">
        <div className="banner-container">
          <h2 className="banner-title">Discover New Movies with Flixster</h2>
        </div>
      </header>
      <div className="main-container">
        <aside className="sidebar">
          <NavBar currentView={currentView} onViewChange={handleViewChange} />
        </aside>
        <main className="content-area">
          {currentView === "home" && (
            <SearchForm
              searchMovies={searchMovies}
              handleClear={handleClear}
              query={query}
            />
          )}
          {currentView === "home" && (
            <SortForm changeSortType={changeSortType} />
          )}
          <MovieList
            movies={filteredMovies}
            loading={loading}
            favorites={favorites}
            watched={watched}
            onFavoriteToggle={handleFavoriteToggle}
            onWatchedToggle={handleWatchedToggle}
          />
          {currentView === "home" && (
            <button onClick={handleLoadMore}>Load more</button>
          )}
        </main>
      </div>

      <footer>
        Developed by{" "}
        <a href="https://www.linkedin.com/in/kailerlaino">Kailer Laino</a>
      </footer>
    </div>
  );
};

export default App;
