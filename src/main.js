function updateTemp(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
  tempElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //make api call and update interface
  // seperation of concern : let a function handle only one call
  let apiKey = "c4fdb23tb783odba9400e73a1a8f8f4f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
     <div>
  <div class="weather-forecast-date">${day}</div>
  <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    alt="weather icon"
    width="42"
    class="weather-forecast-icon"
  />
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temp-max"> 15º </span>
    <span class="weather-forecast-temp-min">9º</span>
  </div>
</div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}
let searchFormValue = document.querySelector("#search-form");
searchFormValue.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");

displayForecast();
