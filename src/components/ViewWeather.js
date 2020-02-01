import React from 'react';
import Toggle from './Toggle';

const DisplayWeather = props => (
  <div id="weatherDescription">
    <h1 id="cityHeader">{props.name !== null ? props.name : ''}</h1>
    <div id="weatherMain">
      <Toggle
        id="toggleButton"
        toggleFunc={props.toggleFunc}
        value="TOGGLE"
        style={{ display: props.toggle ? 'inline' : 'none' }}
      />
      <div id="temperature">
        {props.temp != null
          ? props.temp +
            (props.tempType ? props.tempTypeKey[0] : props.tempTypeKey[1])
          : ''}
      </div>

      <div id="weatherDescriptionHeader" />
      <div>
        <img
          style={{ display: props.toggle ? 'inline' : 'none' }}
          id="documentIconImg"
          src={props.weatherIcon === null ? null : props.weatherIcon}
          alt="weatherIcon"
        />
      </div>
    </div>
    <hr />
    <div id="windSpeed" className="bottomDetails">
      {props.windSpeed !== null ? `Winds at ${props.windSpeed} m/s` : ''}
    </div>
    <div id="humidity" className="bottomDetails">
      {props.humidity !== null ? `Humidity levels at ${props.humidity} %` : ''}
    </div>
  </div>
);

export default DisplayWeather;
