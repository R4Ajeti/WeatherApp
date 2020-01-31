import React, { Component } from 'react';
import './Weather.css';

const APPID = '682251abec592051d124246aeedafbd4';
const units = 'inperials';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '98226',
      toggle: false,
      tempType: false,
      lastTemp: null,
      city: {
        name: '',
        temp: null,
        humidity: null,
        windSpeed: null,
        weatherIcon: ''
      }
    };
    this.onClickSearchControl = this.onClickSearchControl.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);

    this.getSearchMethod = this.getSearchMethod.bind(this);
    this.init = this.init.bind(this);
    this.searchWeather = this.searchWeather.bind(this);

    this.celciusToFarenheit = this.celciusToFarenheit.bind(this);
    this.toggleFunc = this.toggleFunc.bind(this);
  }

  toggleFunc = () => {
    const { lastTemp } = this.state;
    const { city } = this.state;
    let temp = city.temp == null ? city.temp : lastTemp;
    const { tempType } = this.state;

    if (typeof temp !== 'undefined' || temp !== null || temp != null) {
      if (tempType) temp = this.celciusToFarenheit(temp);
      else {
        temp = this.celciusToFarenheit(temp, false);
      }
    }

    const cityState = city;
    cityState.temp = Math.floor(parseFloat(temp));
    this.setState({
      lastTemp: temp,
      tempType: !tempType,
      city: cityState
    });
  };

  celciusToFarenheit = (...args) => {
    if (args[1] === undefined || !args[1] === null) {
      return ((args[0] - 32) * 5) / 9;
    }
    return args[0] * (9 / 5) + 32;
  };

  getSearchMethod = searchTerms => {
    let params = '';
    const getTag = tags =>
      tags.indexOf(',') !== -1 ? tags.substring(0, tags.indexOf(',')) : -1;
    const tagsArr = [];
    if (searchTerms.indexOf(',') === -1) {
      params =
        searchTerms.length === 5 &&
        `${Number.parseInt(searchTerms, 10)}` === searchTerms
          ? `zip=${searchTerms}`
          : `q=${searchTerms}`;
    } else {
      let flag = false;
      while (flag) {
        if (getTag(searchTerms) === -1) flag = true;
        else tagsArr[tagsArr.length] = getTag(searchTerms);
        if (flag) {
          tagsArr[tagsArr.length] = searchTerms;
        } else {
          searchTerms.substring(
            tagsArr[tagsArr.length - 1].length + 1,
            searchTerms.length
          );
        }
      }

      params = `lat=${tagsArr[0]}&lon=${tagsArr[1]}`;
    }

    return params;
  };

  searchWeather = searchTerms => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?${this.getSearchMethod(
        searchTerms
      )}&APPID=${APPID}&units=${units}`
    )
      .then(result => result.json())
      .then(result => {
        this.init(result);
      });
  };

  init = resultFromServer => {
    const cityState = {
      name: null,
      temp: null,
      humidity: null,
      windSpeed: null,
      weatherIcon: null
    };
    cityState.name = resultFromServer.name;
    cityState.temp = Math.floor(resultFromServer.main.temp - 273.15);
    cityState.humidity = Math.floor(resultFromServer.main.humidity);
    cityState.windSpeed = Math.floor(resultFromServer.wind.speed);

    const weatherIconSrc = `https://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`;
    cityState.weatherIcon = weatherIconSrc || null;
    this.setState({
      city: cityState,
      lastTemp: null,
      toggle: true
    });
  };

  onClickSearchControl = event => {
    event.preventDefault();
    const searchTerms = document.getElementById('searchInput').value;
    if (searchTerms) this.searchWeather(searchTerms);
  };

  onClickToggle = () => {
    this.toggleFunc();
  };

  handleChangeSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    const { searchInput, city, toggle, tempType } = this.state;
    return (
      <div className="Weather" style={{ color: 'white' }}>
        <div id="searchContainer">
          <input
            className="searchControl"
            id="searchInput"
            type="text"
            placeholder="Search by city or zip code"
            value={searchInput}
            onChange={event => this.handleChangeSearchInput(event)}
          />
          <button
            type="submit"
            className="searchControl"
            id="searchBtn"
            onClick={this.onClickSearchControl}
          >
            SEARCH
          </button>
        </div>
        <div id="weatherContainer">
          <div id="weatherDescription">
            <h1 id="cityHeader">{city.name !== null ? city.name : ''}</h1>
            <div id="weatherMain">
              <input
                type="button"
                value="TOGGLE"
                id="toggleButton"
                style={{ display: toggle ? 'inline' : 'none' }}
                onClick={this.toggleFunc}
              />
              <div id="temperature">
                {city.temp != null
                  ? city.temp + (tempType ? '° K' : '° C')
                  : ''}
              </div>

              <div id="weatherDescriptionHeader" />
              <div>
                <img
                  id="documentIconImg"
                  src={city.weatherIcon === null ? null : city.weatherIcon}
                  alt="weatherIcon"
                />
              </div>
            </div>
            <hr />
            <div id="windSpeed" className="bottomDetails">
              {city.windSpeed !== null
                ? `Winds at ${city.windSpeed} m/s %`
                : ''}
            </div>
            <div id="humidity" className="bottomDetails">
              {city.humidity !== null
                ? `Humidity levels at ${city.humidity} %`
                : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
