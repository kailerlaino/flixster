import React from 'react'
import './SearchForm.css'

function SearchForm(/*{ onCityChange }*/) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cityName = formData.get('city')
    // onCityChange(cityName)

    event.target.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-input" type="text" name="city" placeholder="Search for Movies" />
      <button className="search-button" type="submit">Search</button>
      <button className="clear-button" /* type="" */>Clear</button>
    </form>
  );
}

export default SearchForm
