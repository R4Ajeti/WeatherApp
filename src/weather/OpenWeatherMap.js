let APPID = '682251abec592051d124246aeedafbd4';
let units = 'inperials';
let searchMethod = '';
const getSearchMethod = searchTerms => {
  if (
    searchTerms.length === 5 &&
    Number.parseInt(searchTerms) + '' === searchTerms
  )
    searchMethod = 'zip';
  else searchMethod = 'q';
  return searchMethod;
};
function searchWeather(searchTerms) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${getSearchMethod(
      searchTerms
    )}=${searchTerms}&APPID=${APPID}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}
function init(resultFromServer) {
  console.log(resultFromServer);

  let weatherDescriptionHeader = document.getElementById(
    'weatherDescriptionHeader'
  );
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src =
    'https://openweathermap.org/img/w/' +
    resultFromServer.weather[0].icon +
    '.png';
  let resultDescription = resultFromServer.weather[0].description;
  //weatherDescriptionHeader.innerText =
  //resultFromServer.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML =
    'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s ';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    'Humidity levels at ' + resultFromServer.main.humidity + '%';
}
export default searchWeather;
