import React from "react";
import "./NavBar.css";

function NavBar( {currentView, onViewChange} ) {
  return (
    <aside>
      <nav className="navbar">
        <ul>
          <li key="home">
            <button className={currentView === 'home' ? 'active' : ''} onClick={() => onViewChange("home")}>
              <span>Home</span>
            </button>
          </li>
          <li key="favorites">
            <button className={currentView === 'favorites' ? 'active' : ''} onClick={() => onViewChange("favorites")}>
              <span>Favorites</span>
            </button>
          </li>
          <li key="watched">
            <button className={currentView === 'watched' ? 'active' : ''} onClick={() => onViewChange("watched")}>
              <span>Watched</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
