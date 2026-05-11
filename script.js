function updateTime() {
  const now = new Date();

  document.getElementById("date").innerText = now.toDateString();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();

function showCheckIn() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("checkInScreen").classList.remove("hidden");
}

function goBack() {
  document.getElementById("checkInScreen").classList.add("hidden");
  document.getElementById("welcomeScreen").classList.remove("hidden");
}

function submitCheckIn() {
  const employee = document.getElementById("employeeSelect").value;
  const visitor = document.getElementById("visitorName").value;

  if (!visitor || !employee) {
    alert("Please complete all fields.");
    return;
  }

  const success = document.getElementById("successMessage");

  success.classList.remove("hidden");
  success.innerHTML = `✅ ${employee} has been notified. Please wait near reception.`;
}

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=43.1394&longitude=-80.2644&current=temperature_2m,weather_code&timezone=America%2FToronto"
    );

    const data = await response.json();

    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    const weatherDescription = getWeatherDescription(code);

    document.getElementById("weather").innerText =
      `Brantford, ON • ${temp}°C • ${weatherDescription}`;

  } catch (error) {
    document.getElementById("weather").innerText =
      "Brantford, ON • Weather unavailable";
  }
}

function getWeatherDescription(code) {
  if (code === 0) return "Clear Sky";
  if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Drizzle";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95) return "Thunderstorm";

  return "Current Conditions";
}

getWeather();
