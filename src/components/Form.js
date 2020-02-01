import React from 'react';

const Form = props => (
  <div id="searchContainer">
    <form onSubmit={props.getWeather}>
      <input
        className="searchControl"
        id="searchInput"
        type="text"
        name="searchTerms"
        placeholder="Search by city or zip code"
      />
      <button type="submit" className="searchControl" id="searchBtn">
        Get Weather
      </button>
    </form>
  </div>
);

export default Form;
