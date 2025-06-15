const API_KEY = "69b73dec04cc569c5868501d07ae3c0d";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=23.811056&lon=90.407608&units=metric&appid=${API_KEY}`
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("Error:", err));
