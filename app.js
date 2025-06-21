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


let logoutState=false;
let calendarState = false;
let otherData = false;
let appMenuStatus = false;
let calendar;





logout.addEventListener("click",()=>{
  logoutDiv.style.display="flex";
  logoutState=!logoutState;}
);

logoutClose.addEventListener("click",()=>{
  logoutDiv.style.display="none";
  logoutState=!logoutState;
})



other.addEventListener("click", () => {
  if(!otherData){
    other.style.rotate = "180deg";
    otherData =!otherData;
  }else{
    other.style.rotate = "0deg";
    otherData =!otherData;
  }
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  bgChange();
});

document.addEventListener("DOMContentLoaded", function () {
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    // events: [
    //   { title: 'Project Start', start: '2025-06-10' },
    //   { title: 'Meeting', start: '2025-06-15' },
    // ],
    // dateClick: function(info) {
    //   alert('Date clicked: ' + info.dateStr);
    // }
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

dateTime.addEventListener("click", () => {
  if (calendarState) {
    calendarEl.style.display = "none";
    calendarState = false;
  } else {
    calendarEl.style.display = "block";
    calendarState = true;
    calendar.render();
  }
});

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

appLaunch.addEventListener("click",()=>{
  if(!appMenuStatus){
    appMenu.style.display="flex"
    appMenuStatus =!appMenuStatus;
  }else{
    appMenu.style.display="none";
    appMenuStatus =!appMenuStatus;
  }
});



