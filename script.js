// API key from OpenWeatherMap
const apiKey = "3414698e951dac20c89af44eee716ac7";

// Base URL for the OpenWeatherMap API using metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get the input field where the user types the city name
const searchBox = document.querySelector(".search input");

// Get the button that the user clicks to search
const searchBtn = document.querySelector(".search button");

// Get the image element to display the appropriate weather icon
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch and display weather data
async function checkWheather(city) {
  // Fetch weather data from API by appending city name and API key
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // If city is not found (404 error), show error message and hide weather info
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Parse the JSON response from the API
    var data = await response.json();

    // Display city name
    document.querySelector(".city").innerHTML = data.name;

    // Display temperature rounded to nearest integer with °C
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

    // Display humidity
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    // Display wind speed
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Log weather type to the console for debugging
    console.log(data.weather[0].main);

    // Update the weather icon based on main weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    // Show weather data card and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Add click event listener to the search button
// When clicked, it will call the checkWheather() function with the input value
searchBtn.addEventListener("click", () => {
  checkWheather(searchBox.value);
});

// You can remove or comment it out unless you want to load a default city
 checkWheather(); // Optional: preload default weather
