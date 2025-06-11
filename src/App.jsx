import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [inSearch, setInSearch] = useState(false)
  const [query, setQuery] = useState('')

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};

  const searchData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/keyword?query=${query}`, options);
    const data = await response.json();
    setSearchResults(data);
    console.log(data)
  }
  
  useEffect(() => {
    if (query !== '') {
      searchData();
    }
  }, [query]);

  const handleQuery = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
        <NavBar />
      </header>

      <main>
        <SearchForm onQueryChange={handleQuery} setInSearch={setInSearch}/>
        <section className="card-list">
          {inSearch ? <MovieList nowPlaying={nowPlaying} setNowPlaying={setNowPlaying}/> : <MovieList nowPlaying={searchResults} setNowPlaying={setSearchResults}/>}
        </section>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/TlP5WIxVirU?si=vK8Y4hOkh7horumc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
