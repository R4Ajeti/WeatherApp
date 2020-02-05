import React from 'react';
import PropTypes from 'prop-types';

const Form = props => {
  const { getWeather } = props;
  return (
    <div id="searchContainer">
      <form onSubmit={getWeather}>
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
};

Form.propTypes = {
  getWeather: PropTypes.func,
};

export default Form;
