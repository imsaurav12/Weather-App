console.log("Hello");
const API_KEY = "168771779c71f3d64106d8a88376808a";

function renderWeatherInfo(data) {
  let newPara = document.createElement("p");
  newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
  document.body.appendChild(newPara);
}

async function showWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    renderWeatherInfo(data);
  } catch (err) {
    console.warn(err);
  }
}

async function getCustomWeather(latitude,longitude) {
  try {
    let result =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}
      `);

    let data = await result.json();
    console.log("Weather -> ", data);
    renderWeatherInfo(data);
  } catch (err) {
    console.log(err);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation Support available");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
}
