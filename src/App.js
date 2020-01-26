import React from 'react';
import { Component } from 'react';
import Weather from './weather/Weather';
import './App.css';
// import { render } from '@testing-library/react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
      </div>
    );
  }
}

export default App;
