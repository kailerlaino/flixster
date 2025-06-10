import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
        <NavBar />
      </header>

      <main>
        <SearchForm />
        <section className="card-list">
          <MovieList />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
