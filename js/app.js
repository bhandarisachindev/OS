import { favData, catData } from "./data.js";
import { 
  updateTimeAndDate, 
  bgChange, 
  getUserCity, 
  fetchWeather, 
  otherBar, 
  viewCalender, 
  toggleWeather, 
  launchApp
} from "./functions.js";
import { openFileManager } from './files.js';
import { colourPicker  } from "./color.js";

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
const files = document.getElementById("files");
const openApp = document.getElementById("open-apps");

let logoutState = false;
let calendarState = false, otherData = false, appMenuStatus = false;
let wState = false, colorState = false,notesState=false;
let calendar, city, weatherData, wIcon;










(function() {
    const img = new Image();
    img.src = "../assets/icons/games-app.avif"; 
    img.onload = () => {

    };
    img.onerror = () => {
      alert(
        "Your browser does not support AVIF images.\n\n" +
        "This webpage is focused on delivering high performance and modern features, " +
        "rather than compatibility with all devices. For the best experience, please update your browser."
      );
    };
  })();




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
colourPicker();

  city = await getUserCity();
  if (document.getElementById("weather-icon")) {
    const result = await fetchWeather(city, weatherData, wIcon, upcominWeather);
    weatherData = result.weatherData;
    wIcon = result.wIcon;
  }

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });

  calendar.render();
  bgChange();
});

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

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

dateTime.addEventListener("click", (e) => {
  calendarState = viewCalender(e, calendarState, calendarEl, calendar);
});

wToogle.addEventListener("click", (e) => {
  wState = toggleWeather(e, wState);
});

appLaunch.addEventListener("click", (e) => {
  e.stopPropagation();
  appMenuStatus = launchApp(e, appMenuStatus, appMenu);
});

window.addEventListener("click", (e) => {
  logoutState = true;
  calendarState = true;
  otherData = true;
  appMenuStatus = true;
  wState = true;
  colorState = true,notesState=true;
  
  wState = toggleWeather(e, wState);
  appMenuStatus = launchApp(e, appMenuStatus, appMenu);
  calendarState = viewCalender(e, calendarState, calendarEl, calendar);
  otherData = otherBar(e, otherData, other);
  
});

other.addEventListener("click", (e) => {
  otherData = otherBar(e, otherData, other);
});



calendarEl.addEventListener("click", e => e.stopPropagation());
document.querySelector(".weather-card")?.addEventListener("click", e => e.stopPropagation());

appMenu.addEventListener("click",(e)=>{
  e.stopPropagation();
})

files.addEventListener("click",(e)=>{
  e.stopPropagation();
  let currentApp= document.createElement("div");
  currentApp.classList.add="window"
  currentApp.innerHTML=`
    <app-top-bar></app-top-bar>
    <files-app></files-app>
  `
  openApp.appendChild(currentApp);
})

files.addEventListener("click", (e) => {
  e.stopPropagation();
  openFileManager();
});