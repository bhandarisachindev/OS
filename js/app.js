import { favData, catData } from "./data.js";
import { 
  topBarHide, 
  updateTimeAndDate, 
  bgChange, 
  getUserCity, 
  fetchWeather, 
  otherBar, 
  viewCalender, 
  toggleWeather, 
  launchApp
} from "./functions.js";

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
const openFiles = document.getElementById("files");
const music = document.getElementById("music");
const notHome = !(window.location.pathname === "/" || window.location.pathname.endsWith("index.html"));




let logoutState = false;
let calendarState = false, otherData = false, appMenuStatus = false;
let wState = false, colorState = false,notesState=false;
let calendar, city, weatherData, wIcon;

const path = window.location.pathname;
const isIndexPage = path === '/' || path.endsWith('index.html');
const isFilesPage = path.endsWith('files.html');
const isMusicPage = path.endsWith('music.html');

if (isFilesPage || isMusicPage) {
  bottomBar.style.backgroundColor = "#161A1C";
  bottomBar.style.padding = "38px";

  bottomBar.style.borderBottom = isMusicPage ? "20px solid rgba(0, 0, 0, 0)" : "20px solid #161A1C";
  bottomBar.style.borderTop = isMusicPage ? "20px solid rgba(0, 0, 0, 0)" : "20px solid #161A1C";

  bottomBar.style.bottom = "-95px";
  topBar.style.padding = "0 12px";
  topBar.style.borderTop = "10px solid #161A1C";
  topBar.style.borderBottom = "20px solid #161A1C";
  topBar.style.top = "-30px";
  appMenu.style.bottom = "75px";
  openFiles.style.borderColor = "lightblue";
}

if (!isIndexPage) {
  topBar.addEventListener('mouseenter', () => {
    gsap.to(topBar, { top: 0, duration: 0.4, ease: "power2.out" });
  });

  topBar.addEventListener('mouseleave', () => {
    if (!calendarState && !otherData && !wState && !colorState && !notesState) {
      topBarHide(topBar);
    }
  });

  bottomBar.addEventListener('mouseenter', () => {
    gsap.to(bottomBar, {
      bottom: -20,
      duration: 0.4,
      boxSizing: "content-box",
      height: 55,
      paddingLeft: 12,
      paddingRight: 12,
      borderTopWidth: 0,
      borderBottomWidth: 40,
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
        borderTopWidth: 20,
      borderBottomWidth: 20,
        duration: 0.4,
        ease: "power2.out",
        backgroundColor: "#1D1E25"
      });
    }
  });
}

openFiles.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "files.html";
});

music.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "music.html";
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
  
  if(notHome){
    topBarHide(topBar); 
  }
});

other.addEventListener("click", (e) => {
  otherData = otherBar(e, otherData, other);
});

calendarEl.addEventListener("click", e => e.stopPropagation());
document.querySelector(".weather-card")?.addEventListener("click", e => e.stopPropagation());






  const noteItems = document.querySelectorAll(".sticky-notes");
  let activeNote = null;
  let offset = { x: 0, y: 0 };

  noteItems.forEach(note => {
    note.addEventListener("mousedown", (e) => {
      activeNote = note;
      offset.x = e.clientX - note.offsetLeft;
      offset.y = e.clientY - note.offsetTop;
      note.style.cursor = "grabbing";
      note.style.zIndex = 50;
    });
  });

  document.addEventListener("mouseup", () => {
    if (activeNote) {
      activeNote.style.cursor = "grab";
      activeNote.style.zIndex = '5'; 
      activeNote = null;
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (activeNote) {
      activeNote.style.left = `${e.clientX - offset.x}px`;
      activeNote.style.top = `${e.clientY - offset.y}px`;
    }
  });  