import React from 'react'
import './SearchForm.css'

function SearchForm({ setQuery, setInSearch }) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const queryString = formData.get('query')
    setQuery(queryString)
    event.target.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} >
      <input className="search-input" type="text" name="query" placeholder="Search for Movies" />
      <button className="search-button" type="submit" onClick={() => setInSearch(true)}>Search</button>
      <button className="clear-button" onClick={() => setInSearch(false)}>Clear</button>
    </form>
  );
}

export default SearchForm
