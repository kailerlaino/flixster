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
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/TlP5WIxVirU?si=vK8Y4hOkh7horumc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
