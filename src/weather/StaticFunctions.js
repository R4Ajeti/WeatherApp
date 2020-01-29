// let tempUnitASCII = ['&#176; F', '&#176; C'];
let tempUnit = ['° F', '° C'];
let currentTemp = null;

function toggleFunc() {
  console.log('running');
  let temperatureElement = document.getElementById('temperature');

  console.log(temperatureElement.innerHTML);
  if (
    !typeof temperatureElement.innerHTML === 'undefined' ||
    !temperatureElement.innerHTML === null
  ) {
    if (temperatureElement.innerHTML.includes(tempUnit[0]))
      currentTemp = temperatureElement.innerHTML =
        celciusToFarenheit(
          parseInt(
            (!currentTemp === null
              ? temperatureElement.innerHTML
              : currentTemp
            ).replace(tempUnit[0], '')
          )
        ) + tempUnit[1];
    else if (
      (!currentTemp === null
        ? temperatureElement.innerHTML
        : currentTemp
      ).includes(tempUnit[1])
    )
      currentTemp = temperatureElement.innerHTML =
        celciusToFarenheit(
          parseInt(temperatureElement.innerHTML.replace(tempUnit[1], '')),
          false
        ) + tempUnit[0];
    else console.log('else statemetn exe');
  } else console.log('null!!');
}
const celciusToFarenheit = (...args) => {
  console.log(args[0]);
  if (args[1] === undefined || !args[1] === null)
    return ((args[0] - 32) * 5) / 9;
  return args[0] * (9 / 5) + 32;
};

export default toggleFunc;
