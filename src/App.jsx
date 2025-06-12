import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import SortForm from "./components/SortForm";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inSearch, setInSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [currentView, setCurrentView] = useState("home");

  const [sortBy, setSortBy] = useState();
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (currentView === "home") {
      fetchMovies();
    /* } else if (currentView === "favorites") {
    //   showFavorites();
    // } else if (currentView === "watched") {
    //   showWatched();
    */}
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

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false&language=en-US&page=${currentPage}`

      );
      const data = await response.json();
      // setSearchResults(data);
      setFilteredMovies(data.results);
      setQuery(query);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilteredMovies(nowPlaying);
    setCurrentPage(1);
  };

  const changeSortType = (type) => {
    setSortBy(type);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    fetchMovies(currentPage + 1, true);
  };

  const handleFavoriteToggle = (movieId) => {
    const newFavorites = favorites.includes(movieId) ? favorites.filter((id) => id !== movieId) : [...favorites, movieId]
    setFavorites(newFavorites)
  }

  const handleWatchedToggle = (movieId) => {
    const newWatched = watched.includes(movieId) ? watched.filter((id) => id !== movieId) : [...watched, movieId]
    setFavorites(newWatched)
  }

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // useEffect(() => {
  //   if (query !== "") {
  //     searchData();
  //   }
  // }, [query]);

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
      </header>

      <main>
        <aside>
          <NavBar onViewChange={handleViewChange} />
        </aside>
        <SearchForm
          setQuery={setQuery}
          searchMovies={searchMovies}
          handleClear={handleClear}
          />
        <SortForm changeSortType={changeSortType} />
        <MovieList movies={filteredMovies} loading={loading} />
        <button onClick={handleLoadMore}>Load more</button>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/TlP5WIxVirU?si=vK8Y4hOkh7horumc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
