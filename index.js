let now = new Date();
let date = document.querySelector("#time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
date.innerHTML = `${today}, ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#anotherCity-input");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${city.value}`;
  let apiKey = `5a7f19181a888360d3d467f103040451`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(getData);
}
let form = document.querySelector("#searching");
form.addEventListener("submit", search);

function getData(response) {
  let temp = Math.round(response.data.main.temp);
  let conditions = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  let houstonTemp = document.querySelector("#currentTemp");
  houstonTemp.innerHTML = `${temp}`;
  let description = document.querySelector("#conditions");
  description.innerHTML = `${conditions}`;
  let winds = document.querySelector("#winds");
  winds.innerHTML = `${wind} km/h`;
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `5a7f19181a888360d3d467f103040451`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getData);
}
let userLocation = document.querySelector("#geoLocation");
userLocation.addEventListener("click", userPlace);

function userPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}