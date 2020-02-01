import React from 'react';
import Form from './Form';
import DisplayWeather from './ViewWeather';
import './Weather.css';
import AlertMessage from './AlertMessage';

const WEATHER_API_KEY = '682251abec592051d124246aeedafbd4';
const units = 'inperials';

class WeatherBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: null,
      toggle: null,
      tempType: null,
      tempTypeKey: ['° C', '° F'],
      lastTemp: null,
      city: {
        name: null,
        temp: null,
        humidity: null,
        windSpeed: null,
        weatherIcon: null
      },
      alert: {
        alertType: null,
        alertTypeKeys: [
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
          'primary',
          'secondary'
        ],
        alertMessage: null
      },
      nullState: {
        searchInput: null,
        toggle: null,
        tempType: null,
        tempTypeKey: ['° C', '° F'],
        lastTemp: null,
        city: {
          name: null,
          temp: null,
          humidity: null,
          windSpeed: null,
          weatherIcon: null
        },
        alert: {
          alertType: null,
          alertTypeKeys: [
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
            'primary',
            'secondary'
          ],
          alertMessage: null
        }
      },
      cachedState: null
    };
    this.celciusToFarenheit = this.celciusToFarenheit.bind(this);
    this.toggleFunc = this.toggleFunc.bind(this);
  }

  getWeather = async e => {
    e.preventDefault();
    const searchTerms = e.target.elements.searchTerms.value;
    const URL = `http://api.openweathermap.org/data/2.5/weather?${this.getSearchMethod(
      searchTerms
    )}&APPID=${WEATHER_API_KEY}&units=${units}`;
    const api_call = await fetch(URL);
    const resultFromServer = await api_call.json();

    const { alert } = this.state;

    if (searchTerms) {
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
      const lastTemp = resultFromServer.main.temp - 273.15;

      this.setState({
        searchInput: searchTerms,
        city: cityState,
        tempType: true,
        lastTemp: lastTemp,
        toggle: true,
        alert: {
          ...alert,
          alertType: 0,
          alertMessage: 'Weather data gathered :)'
        }
      });
    } else {
      this.setState({
        alert: {
          ...alert,
          alertType: 2,
          alertMessage: 'Please enter query to search with !!!'
        }
      });
    }
  };

  toggleFunc = () => {
    const { tempType, city, lastTemp } = this.state;
    let temp = lastTemp;

    if (tempType !== null) {
      if (tempType) temp = this.celciusToFarenheit(lastTemp);

      const cityState = city;
      cityState.temp = Math.floor(parseFloat(temp));
      this.setState({
        tempType: !tempType,
        city: cityState
      });
    }
  };

  celciusToFarenheit = (...args) => {
    args[0] = parseInt(args[0], 10);
    if (args[0]) {
      if (args.length > 1) {
        return ((args[0] - 32) * 5) / 9;
      } else {
        return args[0] * (9 / 5) + 32;
      }
    }
    return null;
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

  render() {
    const { city, toggle, tempType, tempTypeKey, alert } = this.state;

    return (
      <div className="Weather" style={{ color: 'white' }}>
        <div id="weatherContainer">
          <Form getWeather={this.getWeather} />
          <AlertMessage
            style={{ display: alert ? 'inline' : 'none' }}
            alert={true}
            alertType={alert.alertType}
            alertMessage={alert.alertMessage}
          />
          <DisplayWeather
            name={city.name}
            temp={city.temp}
            weatherIcon={city.weatherIcon}
            windSpeed={city.windSpeed}
            humidity={city.humidity}
            tempType={tempType}
            tempTypeKey={tempTypeKey}
            toggle={toggle}
            toggleFunc={this.toggleFunc}
          />
        </div>
      </div>
    );
  }
}

export default WeatherBuilder;
