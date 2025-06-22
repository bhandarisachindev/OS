import { favData, catData, iconMap } from "./data.js";

const bottomBar = document.querySelector(".bottom-bar");
const topBar = document.querySelector('.top-bar');
const dateTime = document.querySelector(".datetime-widget");
const calendarEl = document.getElementById("calendar");
const other = document.getElementById("otherData");
const fav = document.getElementById("app-fav");
const appLaunch = document.getElementById("app-launch");
const appMenu = document.getElementById("app-menu");
const catContainer = document.getElementById("app-cat");
const logout = document.getElementById("logout-btn");
const logoutDiv = document.querySelector(".logout");
const logoutClose = document.querySelector(".ri-close-circle-fill");
const upcominWeather = document.getElementById("upcoming-weather");
const wToogle = document.getElementById("weather-toggle");
const openFiles = document.getElementById("files");


let logoutState = false;
let calendarState = false;
let otherData = false;
let appMenuStatus = false;
let wState = false;
let calendar, city, weatherData, wIcon;


 if (window.location.pathname.endsWith('files.html')) {
  bottomBar.style.backgroundColor = "#161A1C";
  bottomBar.style.padding = "38px";
  bottomBar.style.borderBottom = "20px solid #161A1C";
  bottomBar.style.borderTop = "20px solid #161A1C";
  bottomBar.style.bottom = "-95px";
  topBar.style.padding = "0 12px";
  topBar.style.borderTop="10px solid #161A1C";
  topBar.style.borderBottom = "20px solid #161A1C";
  topBar.style.top = "-30px";
  appMenu.style.bottom="90px";
  openFiles.style.borderColor = "lightblue";
 }

if (!window.location.pathname.endsWith('index.html')) {
  topBar.addEventListener('mouseenter', () => {
    gsap.to(topBar, { top: 0, duration: 0.4, ease: "power2.out" });
  });

  topBar.addEventListener('mouseleave', () => {
    if (!calendarState && !otherData && !wState) {
      topBarHide();
    }
  });

  bottomBar.addEventListener('mouseenter', () => {
    gsap.to(bottomBar, {
      bottom: 0,
      duration: 0.4,
      boxSizing:"content-box",
      height:55,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 0,
      paddingBottom: 0,
      ease: "power2.out",
      backgroundColor: "#1D1E25"
    });
  });

  bottomBar.addEventListener('mouseleave', () => {
    if (!appMenuStatus) {
      gsap.to(bottomBar, {
        bottom: -80,
        delay: 0.4,
        duration: 0.4,
        ease: "power2.out",
        backgroundColor: "#1D1E25"
      });
    }
  });

 }

function topBarHide() {
  gsap.to(topBar, { top: -30, duration: 0.4, ease: "power2.in" });

}


openFiles.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "files.html";
});

logout.addEventListener("click", (e) => {
  e.stopPropagation();
  logoutDiv.style.display = "flex";
  logoutState = !logoutState;
});

logoutClose.addEventListener("click", (e) => {
  e.stopPropagation();
  logoutDiv.style.display = "none";
  logoutState = !logoutState;
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  bgChange();
});

document.addEventListener("DOMContentLoaded", async function () {
  await getUserCity();

  // Only fetch weather if weather container exists
  if (document.getElementById("weather-icon")) {
    fetchWeather(city);
  }

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });

  calendar.render();
  bgChange();
});

function updateTimeAndDate() {
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

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

const bgChange = () => {
  const i = Math.floor(Math.random() * 21);
  document.body.style.backgroundImage = `url('../bg/${i}.jpg')`;
};

favData.forEach(e => {
  const card = document.createElement("a");
  if (e.link) card.setAttribute("href", e.link);
  card.innerHTML = `<div class="card"><img src="${e.image}"><p>${e.app}</p></div>`;
  fav.appendChild(card);
});

catData.forEach(e => {
  const card = document.createElement("div");
  card.className = "app-cat-card";
  card.innerHTML = `<img src="${e.image}"><p>${e.title}</p>`;
  catContainer.appendChild(card);
});

async function getUserCity() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    city = data.city || "delhi"; // fallback if city not in response
  } catch (err) {
    console.warn("Failed to get city, using fallback: Delhi");
    city = "delhi";
  }
}

const fetchWeather = async (city) => {
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
        console.log(cardDay);
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
      console.log(toggleIconEl);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
};

dateTime.addEventListener("click", viewCalender);
wToogle.addEventListener("click", toggleWeather);
appLaunch.addEventListener("click", launchApp);

window.addEventListener("click", (e) => {
  logoutState = true;
  calendarState = true;
  otherData = true;
  appMenuStatus = true;
  wState = true;

  if (!window.location.pathname.endsWith('index.html')) topBarHide();

  toggleWeather(e);
  launchApp(e);
  viewCalender(e);
  otherBar(e);
});

other.addEventListener("click", otherBar);
calendarEl.addEventListener("click", e => e.stopPropagation());
document.querySelector(".weather-card")?.addEventListener("click", e => e.stopPropagation());

function otherBar(e) {
  e.stopPropagation();
  otherData = !otherData;
  other.style.rotate = otherData ? "180deg" : "0deg";
}

function viewCalender(e) {
  e.stopPropagation();
  calendarState = !calendarState;
  calendarEl.style.display = calendarState ? "block" : "none";
  if (calendarState) calendar.render();
}

function toggleWeather(e) {
  e.stopPropagation();
  wState = !wState;
  const card = document.querySelector(".weather-card");
  if (card) card.style.display = wState ? "block" : "none";
}

function launchApp(e) {
  e.stopPropagation();
  appMenuStatus = !appMenuStatus;
  appMenu.style.display = appMenuStatus ? "flex" : "none";
}


