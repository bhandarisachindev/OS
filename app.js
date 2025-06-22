import { favData , catData , iconMap} from "./data.js";

const dateTime = document.querySelector(".datetime-widget");
const calendarEl = document.getElementById("calendar");
const other = document.getElementById("otherData");
const fav=document.getElementById("app-fav");
const appLaunch = document.getElementById("app-launch");
const appMenu = document.getElementById("app-menu");
const catContainer = document.getElementById("app-cat"); 
const logout = document.getElementById("logout-btn");
const logoutDiv = document.querySelector(".logout");
const logoutClose = document.querySelector(".ri-close-circle-fill");
const upcominWeather = document.getElementById("upcoming-weather");
const wToogle = document.getElementById("weather-toggle");


let logoutState=false;
let calendarState = false;
let otherData = false;
let appMenuStatus = false;
let wState=false;
let calendar, city, weatherData,wIcon;




logout.addEventListener("click",(e)=>{
  e.stopPropagation();
  logoutDiv.style.display="flex";
  logoutState=!logoutState;}
);

logoutClose.addEventListener("click",(e)=>{
  e.stopPropagation(e);
  logoutDiv.style.display="none";
  logoutState=!logoutState;
})





document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  bgChange();
});

document.addEventListener("DOMContentLoaded", async function () {
  await getUserCity();
  fetchWeather(city);

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
  document.body.style.backgroundImage = `url('bg/${i}.jpg')`;
};


favData.forEach(e => {
  const card = document.createElement("a");
  if(e.link)card.setAttribute("href", e.link);
  card.innerHTML = `<div class="card"><img src="${e.image}"><p>${e.app}</p></div>`;
  fav.appendChild(card);
});
catData.forEach(e => {
  const card = document.createElement("div");
  card.setAttribute("class","app-cat-card");
  card.innerHTML=` <img src=${e.image}><p>${e.title}</p>`
  
  catContainer.appendChild(card);
});



async function getUserCity() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    city=data.city;

  } catch (err) {
    console.error("Failed to get city:", err);
  }
}

const fetchWeather = async (city) => {
  const isDaytime = (() => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
  })();

  if(city){
    try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    weatherData = await response.json();
    console.log(weatherData);

    let cityW= weatherData.nearest_area[0].areaName[0].value,
        countryW = weatherData.nearest_area[0].country[0].value,
        temp = weatherData.current_condition[0].temp_C,
        humidity=weatherData.current_condition[0].humidity,
        pressure=weatherData.current_condition[0].pressure,
        wCode = weatherData.current_condition[0].weatherCode
    
     if (wCode==113 || wCode== 116 || wCode==119){
      wIcon = iconMap[wCode][isDaytime];
    }else{
      wIcon = iconMap[wCode] || iconMap["default"];
    }

    console.log(weatherData.weather);
    


    

 weatherData.weather.forEach(day => {

  let totalChance = 0;
  let count = 0;
  day.hourly.forEach(h => {
    const rainChance = parseInt(h.chanceofrain, 10);
    totalChance += rainChance;
    count++;
  });
  const avgRChance = (totalChance / count).toFixed(0);

  console.log(day)
  const cardDay = document.createElement("div");
    cardDay.setAttribute("class","date-wise");
    cardDay.innerHTML=`<p id="wDate">${day.date}</p><span id="wRain"><i class="ri-umbrella-fill"></i></span><p id="rChance">${avgRChance}%</p><p id="wMaxT">${day.maxtempC}&degC</p><p id="wMinT">${day.mintempC}&degC</p>`

    console.log(cardDay);

    upcominWeather.appendChild(cardDay);
 });
   

    wToogle.innerHTML=`<img id="weather-toggle-icon" src="/assets/Weather/${wIcon}">`;
    document.getElementById("weather-icon").setAttribute("src",`./assets/Weather/${wIcon}`);
    document.getElementById("weather-city").innerHTML=`${cityW}, ${countryW}`;
    document.getElementById("temp").innerHTML= `${temp}&degC`;
    document.getElementById("humidity").innerHTML= `Humidity: ${humidity}%`;
    document.getElementById("pressure").innerHTML=`Pressure: ${pressure} hPa`
    } catch (error) {
    console.error("Error fetching weather:", error);
  }}
};

dateTime.addEventListener("click",viewCalender);
wToogle.addEventListener("click",toggleWeather);
appLaunch.addEventListener("click",launchApp);

window.addEventListener("click",(e)=>{
 logoutState=true;
 calendarState = true;
 otherData = true;
 appMenuStatus = true;
 wState=true;
  toggleWeather(e);
  launchApp(e);
  viewCalender(e);
  otherBar(e);
})

other.addEventListener("click",otherBar);

function otherBar(e){
  e.stopPropagation(e);
  if(!otherData){
    other.style.rotate = "180deg";
    otherData =!otherData;
  }else{
    other.style.rotate = "0deg";
    otherData =!otherData;
  }
}



function viewCalender(e){
  e.stopPropagation();
  if (calendarState) {
    calendarEl.style.display = "none";
    calendarState = false;
  } else {
    calendarEl.style.display = "block";
    calendarState = true;
    calendar.render();
  }
}

function toggleWeather(e){
  e.stopPropagation();
  if(!wState){
    document.querySelector(".weather-card").style.display="block";
    wState=!wState
  }else{
    document.querySelector(".weather-card").style.display="none";
    wState=!wState
  }
};

function launchApp(e){
  e.stopPropagation();
  if(!appMenuStatus){
    appMenu.style.display="flex"
    appMenuStatus =!appMenuStatus;
  }else{
    appMenu.style.display="none";
    appMenuStatus =!appMenuStatus;
  }
}