import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import SortForm from "./components/SortForm"
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inSearch, setInSearch] = useState(false);
  const [query, setQuery] = useState("");

  const [sortBy, setSortBy] = useState()

  

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchMovies();
  }, [sortBy]);

  const fetchMovies = async (page = 1, append = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`
        // `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      console.log("fetching")
      console.log(data.results)
      if (append) {
        setNowPlaying((prev) => ([...prev, ...data.results ]));
        setFilteredMovies((prev) => ([ ...prev, ...data.results ]));
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

  const handleLoadMore = () => {
    fetchMovies(currentPage + 1, true);
  };

  const handleClear = () => {
    setFilteredMovies(nowPlaying)
    setCurrentPage(1)
  }

  const changeSortType = (type) => {
    setSortBy(type)
    setCurrentPage(1)
  }

  // useEffect(() => {
  //   if (query !== "") {
  //     searchData();
  //   }
  // }, [query]);

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
        <NavBar />
      </header>

      <main>
        <aside>
        </aside>
        <SearchForm setQuery={setQuery} searchMovies={searchMovies} handleClear={handleClear}/>
        {/* TODO: Turn sort by form into a component */}
        {/* <form>
          <span>Sort By:   </span>
          <select name="sortBy" onChange={(e) => changeSortType(e.target.value)}>
            <option>Now Playing</option>
            <option value="title.asc">Title (A-Z)</option>
            <option value="release_date.desc">Release Date (Newest)</option>
            <option value="vote_average.desc">Rating (Highest)</option>
          </select>
        </form> */}
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
