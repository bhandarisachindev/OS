  import { iconMap } from "./data.js";

export function topBarHide(topBar) {
  gsap.to(topBar, { top: -30, duration: 0.4, ease: "power2.in" });
}

export function updateTimeAndDate() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  const date = `${month}/${day}/${year}`;

  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

export const bgChange = () => {
  const i = Math.floor(Math.random() * 21);
  document.body.style.backgroundImage = `url('../bg/${i}.jpg')`;
};

export async function getUserCity() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return data.city || "delhi";
  } catch (err) {
    console.warn("Failed to get city, using fallback: Delhi");
    return "delhi";
  }
}

export const fetchWeather = async (city, weatherData, wIcon, upcominWeather) => {
  const isDaytime = (() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  })();

  if (city) {
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      weatherData = await response.json();

      const cityW = weatherData.nearest_area[0].areaName[0].value;
      const countryW = weatherData.nearest_area[0].country[0].value;
      const temp = weatherData.current_condition[0].temp_C;
      const humidity = weatherData.current_condition[0].humidity;
      const pressure = weatherData.current_condition[0].pressure;
      const wCode = weatherData.current_condition[0].weatherCode;

      wIcon = (iconMap[wCode] && (wCode == 113 || wCode == 116 || wCode == 119))
        ? iconMap[wCode][isDaytime]
        : iconMap[wCode] || iconMap["default"];

      weatherData.weather.forEach(day => {
        let totalChance = 0;
        let count = 0;
        day.hourly.forEach(h => {
          totalChance += parseInt(h.chanceofrain, 10);
          count++;
        });
        const avgRChance = (totalChance / count).toFixed(0);

        const cardDay = document.createElement("div");
        cardDay.className = "date-wise";
        cardDay.innerHTML = `
          <p id="wDate">${day.date}</p>
          <span id="wRain"><i class="ri-umbrella-fill"></i></span>
          <p id="rChance">${avgRChance}%</p>
          <p id="wMaxT">${day.maxtempC}&degC</p>
          <p id="wMinT">${day.mintempC}&degC</p>
        `;

        upcominWeather?.appendChild(cardDay);
      });

      const toggleIconEl = document.getElementById("weather-toggle-icon");
      const iconEl = document.getElementById("weather-icon");
      const cityEl = document.getElementById("weather-city");
      const tempEl = document.getElementById("temp");
      const humidityEl = document.getElementById("humidity");
      const pressureEl = document.getElementById("pressure");

      if (toggleIconEl) toggleIconEl.src = `../assets/Weather/${wIcon}`;
      if (iconEl) iconEl.src = `../assets/Weather/${wIcon}`;
      if (cityEl) cityEl.innerHTML = `${cityW}, ${countryW}`;
      if (tempEl) tempEl.innerHTML = `${temp}&degC`;
      if (humidityEl) humidityEl.innerHTML = `Humidity: ${humidity}%`;
      if (pressureEl) pressureEl.innerHTML = `Pressure: ${pressure} hPa`;

      return { weatherData, wIcon };
    } catch (error) {
      console.error("Error fetching weather:", error);
      return { weatherData, wIcon };
    }
  }
  return { weatherData, wIcon };
};

export function otherBar(e, otherData, other) {
  e.stopPropagation();
  otherData = !otherData;
  other.style.rotate = otherData ? "180deg" : "0deg";
  return otherData;
}

export function viewCalender(e, calendarState, calendarEl, calendar) {
  e.stopPropagation();
  calendarState = !calendarState;
  calendarEl.style.display = calendarState ? "block" : "none";
  if (calendarState) calendar.render();
  return calendarState;
}

export function toggleWeather(e, wState) {
  e.stopPropagation();
  wState = !wState;
  const card = document.querySelector(".weather-card");
  if (card) card.style.display = wState ? "block" : "none";
  return wState;
}

export function launchApp(e, appMenuStatus, appMenu) {
  e.stopPropagation();
  appMenuStatus = !appMenuStatus;
  appMenu.style.display = appMenuStatus ? "flex" : "none";
  return appMenuStatus;
}


