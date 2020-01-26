import React, { Component } from 'react';
import searchWeather from './OpenWeatherMap.js';
import './Weather.css';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '98226'
    };
    // This binding is necessary to make `this` work in the callback
    this.onClickSearchControl = this.onClickSearchControl.bind(this);
    this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);
  }
  onClickSearchControl = () => {
    let searchTerms = document.getElementById('searchInput').value;
    if (searchTerms) searchWeather(searchTerms);
  };
  handleChangeSearchInput = e => {
    this.setState({ ...this.state, searchInput: e.target.value });
    console.log('handle change called');
  };
  render() {
    return (
      <div className="Weather" style={{ color: 'white' }}>
        <div id="searchContainer">
          <input
            className="searchControl"
            id="searchInput"
            type="text"
            placeholder="Search by city or zip code"
            value={this.state.searchInput}
            onChange={this.handleChangeSearchInput}
          ></input>
          <button
            className="searchControl"
            id="searchBtn"
            onClick={this.onClickSearchControl}
          >
            SEARCH
          </button>
        </div>
        <div id="weatherContainer">
          <div id="weatherDescription">
            <h1 id="cityHeader"></h1>
            <div id="weatherMain">
              <div id="temperature"></div>
              <div id="weatherDescriptionHeader"></div>
              <div>
                <img id="documentIconImg" />
              </div>
            </div>
            <hr />
            <div id="windSpeed" className="bottomDetails"></div>
            <div id="humidity" className="bottomDetails"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
