const API_KEY = "69b73dec04cc569c5868501d07ae3c0d";

// .......dom Selection. ......
let mainDiv = document.querySelector(".mainDiv");
let outPutDiv = document.querySelector(".outPutDiv");
let errorDiv = document.querySelector(".errorDiv");
let input = document.querySelector(".input");
let inputButton = document.querySelector(".inputButton");
let main = document.querySelector(".main");
let mainsub = document.querySelector(".mainsub");
let humiditytext = document.querySelector(".humiditytext");
let airtext = document.querySelector(".airtext");
let aqitext = document.querySelector(".aqitext");
let realfeeltext = document.querySelector(".realfeeltext");
let pressuretext = document.querySelector(".pressuretext");
let card3 = document.querySelector(".card3");
let firstData = [];
inputButton.addEventListener("click", () => {
  if (!input.value) {
    alert("Enter a city name");
    outPutDiv.style.display = "block";
    errorDiv.style.display = "none";
  } else {
    // fetching geo code data
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((geodData) => {
        firstData = geodData;
        console.log("firstData : ", firstData);
        if (firstData.length == 0) {
          input.value = "";
          outPutDiv.style.display = "none";
          errorDiv.style.display = "block";
        } else {
          outPutDiv.style.display = "block";

          errorDiv.style.display = "none";

          // fetching weather data
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${geodData[0].lat}&lon=${geodData[0].lon}&units=metric&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("main_data", data);
              main.innerHTML = `${data.main.temp}°C`;
              mainsub.innerHTML = `${firstData[0].name} , ${firstData[0].country}`;
              humiditytext.innerHTML = `Humidity <br/> ${data.main.humidity}%`;
              airtext.innerHTML = `wind <br/> ${(data.wind.speed * 3.6).toFixed(
                1
              )} km/h`;
              card3.innerHTML = `${data.weather[0].description}`;
              realfeeltext.innerHTML = `Feels Like<br/> ${data.main.feels_like}°C`;
              pressuretext.innerHTML = `Pressure<br/> ${data.main.pressure} mbar`;
            })
            .catch((err) => console.log("Error:", err));

          // fetching AQI Data
          fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${geodData[0].lat}&lon=${geodData[0].lon}&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((aqiData) => {
              console.log(aqiData);
              aqitext.innerHTML = `AQI <br/>${aqiData.list[0].main.aqi}`;
            });
        }
      })
      .catch((err) => console.log("Error:", err));
  }
});
