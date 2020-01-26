let APPID = '682251abec592051d124246aeedafbd4';
let units = 'inperials';
let searchMethod = '';
const getSearchMethod = searchTerms => {
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
function searchWeather(searchTerms) {
  console.log(
    `http://api.openweathermap.org/data/2.5/weather?${getSearchMethod(
      searchTerms
    )}&APPID=${APPID}&units=${units}`
  );
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${getSearchMethod(
      searchTerms
    )}&APPID=${APPID}&units=${units}`
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
