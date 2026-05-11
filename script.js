function updateTime() {
  const now = new Date();

  document.getElementById("date").innerText =
    now.toDateString();

  document.getElementById("time").innerText =
    now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();

function showCheckIn() {
  document
    .getElementById("welcomeScreen")
    .classList.add("hidden");

  document
    .getElementById("checkInScreen")
    .classList.remove("hidden");
}

function goBack() {
  document
    .getElementById("checkInScreen")
    .classList.add("hidden");

  document
    .getElementById("welcomeScreen")
    .classList.remove("hidden");
}

function submitCheckIn() {

  const employee =
    document.getElementById("employeeSelect").value;

  const visitor =
    document.getElementById("visitorName").value;

  if (!visitor || !employee) {
    alert("Please complete all fields.");
    return;
  }

  const success =
    document.getElementById("successMessage");

  success.classList.remove("hidden");

  success.innerHTML =
    `✅ ${employee} has been notified. Please wait near reception.`;
}

async function getWeather() {

  try {

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=43.1394&longitude=-80.2644&current_weather=true&temperature_unit=celsius&timezone=America%2FToronto"
    );

    const data = await response.json();

    const temp =
      Math.round(data.current_weather.temperature);

    const code =
      data.current_weather.weathercode;

    const weatherDescription =
      getWeatherDescription(code);

    document.getElementById("weather").innerText =
      `Brantford, ON • ${temp}°C • ${weatherDescription}`;

  }

  catch (error) {

    document.getElementById("weather").innerText =
      "Brantford, ON • Weather unavailable";

  }
}

function getWeatherDescription(code) {

  const weatherMap = {

    0: "Clear Sky",

    1: "Mostly Clear",

    2: "Partly Cloudy",

    3: "Overcast",

    45: "Fog",

    48: "Freezing Fog",

    51: "Light Drizzle",

    53: "Moderate Drizzle",

    55: "Heavy Drizzle",

    56: "Freezing Drizzle",

    57: "Heavy Freezing Drizzle",

    61: "Light Rain",

    63: "Moderate Rain",

    65: "Heavy Rain",

    66: "Freezing Rain",

    67: "Heavy Freezing Rain",

    71: "Light Snow",

    73: "Moderate Snow",

    75: "Heavy Snow",

    77: "Snow Grains",

    80: "Light Rain Showers",

    81: "Moderate Rain Showers",

    82: "Heavy Rain Showers",

    85: "Light Snow Showers",

    86: "Heavy Snow Showers",

    95: "Thunderstorm",

    96: "Thunderstorm With Hail",

    99: "Severe Thunderstorm"
  };

  return weatherMap[code] || "Current Conditions";
}

getWeather();
