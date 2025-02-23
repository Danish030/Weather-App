fetch(url)
      .then(response => response.json())
      .then(data => {
          const weatherResult = document.getElementById('weather-result');
          if (data.cod === 200) {
              weatherResult.innerHTML = `
              <h2>${data.name}</h2>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Weather: ${data.weather[0].description}</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Wind Speed: ${data.wind.speed} m/s</p>
              <p>Pressure: ${data.main.pressure} hPa</p>
          `;
          } else {
              weatherResult.innerHTML = `<p>${data.message}</p>`;
          }
          console.log(data);
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
      });
});



const weatherResult = document.getElementById("weather-result")
    document.getElementById("city").innerHTML = data.city.name;
    const firstWeather = data.list[0];
    weatherResult.innerHTML = `
    <p>Temperature: ${(firstWeather.main.temp - 273.15).toFixed(2)}°C</p>  <!-- Convert Kelvin to Celsius -->
    <p>Weather: ${firstWeather.weather[0].description}</p>
    <p>Humidity: ${firstWeather.main.humidity}%</p>
    <p>Wind Speed: ${firstWeather.wind.speed} m/s</p>
    <p>Pressure: ${firstWeather.main.pressure} hPa</p>