import React, { Component } from 'react';
import './Weather.css';

let APPID = '682251abec592051d124246aeedafbd4';
let units = 'inperials';
let searchMethod = '';

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
    // This binding is necessary to make `this` work in the callback
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
    let tempUnit = ['° F', '° C'];
    let temp = this.state.lastTemp;
    temp = temp == null ? this.state.city.temp : this.state.lastTemp;
    let tempType = this.state.tempType;

    if (typeof temp !== 'undefined' || temp !== null || temp != null) {
      if (tempType) temp = this.celciusToFarenheit(temp);
      else {
        temp = this.celciusToFarenheit(temp, false);
      }
    }

    let cityState = this.state.city;
    cityState.temp = Math.floor(parseFloat(temp));
    this.setState({
      ...this.state,
      lastTemp: temp,
      tempType: !tempType,
      city: cityState
    });
  };
  celciusToFarenheit = (...args) => {
    console.log(args[0]);
    if (args[1] === undefined || !args[1] === null)
      return ((args[0] - 32) * 5) / 9;
    return args[0] * (9 / 5) + 32;
  };

  getSearchMethod = searchTerms => {
    let params = '';
    let regex = '^[0-9]+.?[0-9]*,[0-9]+.?[0-9]*$';
    let res = searchTerms.match(regex);
    let getTag = tags =>
      tags.indexOf(',') != -1 ? tags.substring(0, tags.indexOf(',')) : -1;
    let tagsArr = [];
    if (searchTerms.indexOf(',') == -1) {
      params =
        searchTerms.length === 5 &&
        Number.parseInt(searchTerms) + '' === searchTerms
          ? 'zip' + '=' + searchTerms
          : 'q' + '=' + searchTerms;
    } else {
      while (searchTerms != '') {
        let flag = false;
        if (getTag(searchTerms) == -1) flag = true;
        else tagsArr[tagsArr.length] = getTag(searchTerms);
        if (flag) {
          tagsArr[tagsArr.length] = searchTerms;
          searchTerms = '';
        } else {
          searchTerms = searchTerms.substring(
            tagsArr[tagsArr.length - 1].length + 1,
            searchTerms.length
          );
        }
        console.log(tagsArr);
      }

      params = 'lat=' + tagsArr[0] + '&lon=' + tagsArr[1];
    }

    return params;
  };
  searchWeather = searchTerms => {
    console.log(
      `http://api.openweathermap.org/data/2.5/weather?${this.getSearchMethod(
        searchTerms
      )}&APPID=${APPID}&units=${units}`
    );
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?${this.getSearchMethod(
        searchTerms
      )}&APPID=${APPID}&units=${units}`
    )
      .then(result => {
        return result.json();
      })
      .then(result => {
        this.init(result);
      });
  };
  init = resultFromServer => {
    console.log(resultFromServer);

    let weatherDescriptionHeader = document.getElementById(
      'weatherDescriptionHeader'
    );
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    let cityState = {
      name: null,
      temp: null,
      humidity: null,
      windSpeed: null,
      weatherIcon: null
    };
    console.log('dsadasda');
    console.log(this.state.city.name);
    console.log('dsadasda');
    cityState.name = resultFromServer.name;
    cityState.temp = Math.floor(resultFromServer.main.temp - 273.15);
    cityState.humidity = Math.floor(resultFromServer.main.humidity);
    cityState.windSpeed = Math.floor(resultFromServer.wind.speed);

    let weatherIconSrc =
      'https://openweathermap.org/img/w/' +
      resultFromServer.weather[0].icon +
      '.png';
    cityState.weatherIcon = weatherIconSrc ? weatherIconSrc : null;

    /*
    this.setState({
      ...this.state,
      city: {
        ...this.state.city,
        name: cityState.windSpeed == null ? null : cityState.name,
        temp: cityState.temp == null ? null : cityState.temp,
        humidity: cityState.humidity == null ? null : cityState.humidity,
        windSpeed: cityState.windSpeed == null ? null : cityState.windSpeed,
        weather: cityState.weather == null ? null : cityState.weather
      }
    });*/
    console.log(cityState);
    this.setState({
      ...this.state,
      city: cityState,
      toggle: true
    });
  };

  onClickSearchControl = () => {
    let searchTerms = document.getElementById('searchInput').value;
    if (searchTerms) this.searchWeather(searchTerms);
  };
  onClickToggle = () => {
    this.toggleFunc();
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
            <h1 id="cityHeader">
              {this.state.city.name != null ? this.state.city.name : ''}
            </h1>
            <div id="weatherMain">
              <input
                type="button"
                value="TOGGLE"
                id="toggleButton"
                style={{ display: this.state.toggle ? 'inline' : 'none' }}
                onClick={this.toggleFunc}
              ></input>
              <div id="temperature">
                {this.state.city.temp != null
                  ? this.state.city.temp + (this.state.tempType ? '° K' : '° C')
                  : ''}
              </div>

              <div id="weatherDescriptionHeader"></div>
              <div>
                <img
                  id="documentIconImg"
                  src={
                    this.state.city.weatherIcon == null
                      ? null
                      : this.state.city.weatherIcon
                  }
                />
              </div>
            </div>
            <hr />
            <div id="windSpeed" className="bottomDetails">
              {this.state.city.windSpeed != null
                ? 'Winds at  ' + this.state.city.windSpeed + ' m/s'
                : ''}
            </div>
            <div id="humidity" className="bottomDetails">
              {this.state.city.humidity != null
                ? 'Humidity levels at ' + this.state.city.humidity + ' %'
                : ''}
              {console.log(this.state)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
