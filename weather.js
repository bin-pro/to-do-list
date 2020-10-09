const API_KEY = "dd3371f7e278e3318d480553dc3dcd64";
const COORDS = "coords";
const weatherDiv = document.querySelector(".js-weather");

const span1 = document.querySelector(".js-weather__span1"),
  span2 = document.querySelector(".js-weather__span2"),
  span3 = document.querySelector(".js-weather__span3"),
  icon = document.querySelector(".js-weather__icon");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const getWeather = json.weather[0].description;

      setWeatherIcon(getWeather);
      span1.innerText = `${getWeather}`;
      span2.innerText = `${Math.ceil(temperature)}°`;
      span3.innerText = `${place}`;
    });
}

function setWeatherIcon(getWeather) {
  if (getWeather === "light rain") {
    icon.classList.add("fas");
    icon.classList.add("fa-cloud-rain");
  } else if (getWeather === "clear sky") {
    icon.classList.add("fas");
    icon.classList.add("fa-sun");
  } else if (getWeather === "overcast clouds") {
    icon.classList.add("fas");
    icon.classList.add("fa-cloud");
  } else if (getWeather === "broken clouds") {
    icon.classList.add("fas");
    icon.classList.add("fa-cloud-sun");
  }
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Can't access geolocation");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
