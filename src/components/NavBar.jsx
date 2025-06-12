import React from "react";
import "./NavBar.css";

function NavBar( {onViewChange} ) {
  return (
    <aside>
      <nav className="nav-bar">
        <ul>
          <li key="home">
            <button className="view-button" onClick={() => onViewChange("home")}>
              <span>Home</span>
            </button>
          </li>
          <li key="favorites">
            <button className="view-button" onClick={() => onViewChange("favorites")}>
              <span>Favorites</span>
            </button>
          </li>
          <li key="watched">
            <button className="view-button" onClick={() => onViewChange("watched")}>
              <span>Watched</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
