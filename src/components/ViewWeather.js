import React from 'react';
import PropTypes from 'prop-types';
import Toggle from './Toggle';

const DisplayWeather = props => {
  const {
    name,
    temp,
    tempType,
    tempTypeKey,
    toggle,
    humidity,
    windSpeed,
    weatherIcon,
    toggleFunc,
  } = props;
  return (
    <div id="weatherDescription" style={{ color: '#61dafb' }}>
      <h1 id="cityHeader">{name !== null ? name : ''}</h1>
      <div id="weatherMain">
        <Toggle
          id="toggleButton"
          toggleFunc={toggleFunc}
          value="TOGGLE"
          toggle={toggle}
        />
        <div id="temperature">
          {temp != null
            ? temp + (tempType ? tempTypeKey[0] : tempTypeKey[1])
            : ''}
        </div>

        <div id="weatherDescriptionHeader" />
        <div>
          <img
            style={{ display: toggle ? 'inline' : 'none' }}
            id="documentIconImg"
            src={weatherIcon === null ? null : weatherIcon}
            alt="weatherIcon"
          />
        </div>
      </div>
      <hr />
      <div id="windSpeed" className="bottomDetails">
        {windSpeed !== null ? `Winds at ${windSpeed} m/s` : ''}
      </div>
      <div id="humidity" className="bottomDetails">
        {humidity !== null ? `Humidity levels at ${humidity} %` : ''}
      </div>
    </div>
  );
};
DisplayWeather.propTypes = {
  name: PropTypes.string,
  temp: PropTypes.number,
  tempType: PropTypes.bool,
  tempTypeKey: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.bool,
  humidity: PropTypes.number,
  windSpeed: PropTypes.number,
  weatherIcon: PropTypes.string,
  toggleFunc: PropTypes.func,
};

export default DisplayWeather;
