function updateTemp(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
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

let searchFormValue = document.querySelector("#search-form");
searchFormValue.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");