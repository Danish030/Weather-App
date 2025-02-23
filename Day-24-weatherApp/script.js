// getting user's location
let button = document.getElementById("get-location");
// let latSpan = document.getElementById("latitude");
// let lonSpan = document.getElementById("longitude");

// const latitude = parseFloat(latSpan.textContent);
// const longitude = parseFloat(lonSpan.textContent);

function updateLocaleTime(elementId, weathertime) {
  const dateStr = `${weathertime}`;
  const dateObj = new Date(dateStr.replace(" ", "T") + "Z");
  const localeTimeOnly = dateObj.toLocaleTimeString();
  document.getElementById(elementId).innerHTML = localeTimeOnly;
}

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    latSpan.innerText = lat.toFixed(2);
    lonSpan.innerText = long.toFixed(2);
  });
});

// const city = document.getElementById("city").value;
const apiKey = "0c34ea203fb1c8389e2e9872f81f2766";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=37.1289771&lon=-84.0832646&appid=${apiKey}`;
// const citybyName = `http:api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`; for by name search
async function checkWeather() {
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);
  
  // const weatherResult = document.getElementById("weather-result")
  // last five sets of data
  document.querySelector(".city").innerHTML = data.city.name;
  // card - 0 data
  for (let i = 0; i < 5; i++) {
    const weatherData = data.list[i];
    document.getElementById(`temp-value${i === 0 ? "" : i}`).innerHTML =
      (weatherData.main.temp - 273.15).toFixed(2) + "°C";
    document.getElementById(`weather-value${i === 0 ? "" : i}`).innerHTML =
      weatherData.weather[0].description;
    document.getElementById(`humidity${i === 0 ? "" : i}`).innerHTML =
      weatherData.main.humidity + "%";
    let weathertime = weatherData.dt_txt;
    // Replace the repetitive code with a single function call
    updateLocaleTime(`date${i === 0 ? "" : i}`, weathertime);
  }

  // last 8 days data
  const eightDayData = [];
  const uniqueDays = new Set();
  for (let i = 0; i < data.list.length; i++) {
    const weatherData = data.list[i];
    // Extract the date part (YYYY-MM-DD) from the dt_txt string
    const date = weatherData.dt_txt.split(" ")[0];
    // If this date is not yet in the uniqueDates set, and we've selected fewer than 5 days, add it
    if (!uniqueDays.has(date) && uniqueDays.size < 5) {
      uniqueDays.add(date);
      eightDayData.push(weatherData);
    }
  }
  console.log(eightDayData);

  // Function to format date and return it as a string
  function formatDate(n) {
    const now = new Date(eightDayData[n].dt_txt);
    const day = now.toLocaleString("en-IN", { weekday: "short" });
    const month = now.toLocaleString("en-IN", { month: "short" });
    const dayOfMonth = now.getDate();
    return `${day} ${month} ${dayOfMonth}`;
  }

  // Set the formatted date for the first day

for (let i = 0; i < 5; i++) {
  // Dynamic ID creation with consistent naming
  document.getElementById(`day&date${i === 0 ? "" : i}`).innerHTML =
    formatDate(i);
  document.getElementById(`day-cloud${i === 0 ? "" : i}`).innerHTML =
    eightDayData[i].weather[0].description;
  document.getElementById(`day-temp${i === 0 ? "" : i}`).innerHTML =
    (eightDayData[i].main.temp - 273.15).toFixed(2) + "°C";
  document.getElementById(`day-humidity${i === 0 ? "" : i}`).innerHTML =
    eightDayData[i].main.humidity + "%";
}
    
}

checkWeather();
