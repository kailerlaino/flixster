import React from "react";
import "./SortForm.css";

function SortForm({ changeSortType }) {
  return (
    <form>
      <span>Sort By: </span>
      <select name="sortBy" onChange={(e) => changeSortType(e.target.value)}>
        <option>Now Playing</option>
        <option value="title.asc">Title (A-Z)</option>
        <option value="release_date.desc">Release Date (Newest)</option>
        <option value="vote_average.desc">Rating (Highest)</option>
      </select>
    </form>
  );
}

export default SortForm;
