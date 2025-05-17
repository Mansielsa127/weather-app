async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "decf28b9239a25f1661fb6f0febbb685"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          if (data.cod === 200) {
            const weather = data.weather[0].main.toLowerCase();
            let weatherImage = "";
      
            // Pick an image based on weather
            if (weather.includes("rain")) {
              weatherImage = "https://openweathermap.org/img/wn/09d@2x.png";
            } else if (weather.includes("cloud")) {
              weatherImage = "https://openweathermap.org/img/wn/03d@2x.png";
            } else if (weather.includes("clear")) {
              weatherImage = "https://openweathermap.org/img/wn/01d@2x.png";
            } else {
              weatherImage = "https://openweathermap.org/img/wn/50d@2x.png";
            }
      
            const weatherInfo = `
              <img src="${weatherImage}" alt="${data.weather[0].description}">
              <p><strong>City:</strong> ${data.name}</p>
              <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
              <p><strong>Weather:</strong> ${data.weather[0].main}</p>
              <p><strong>Description:</strong> ${data.weather[0].description}</p>
              <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            document.getElementById("weatherResult").innerHTML = weatherInfo;
          } else {
            document.getElementById("weatherResult").innerHTML = `<p>${data.message}</p>`;
          }
        } catch (error) {
          document.getElementById("weatherResult").innerHTML = `<p>Error fetching data</p>`;
        }
      }
      