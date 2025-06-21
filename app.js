const dateTime = document.querySelector(".datetime-widget");
const calendarEl = document.getElementById("calendar");
const other = document.getElementById("otherData");
const fav=document.getElementById("app-fav");
const appLaunch = document.getElementById("app-launch");
const appMenu = document.getElementById("app-menu");

let calendarState = false;
let otherData = false;
let appMenuStatus = false;
let calendar;

let favData=[
  {link:"https://www.google.com/",image:"/assets/google-chrome.png",app:"Google Chrome"},
  {image:"/assets/vlc.png",app:"VLC media player"},
  {image:"/assets/vim.png",app:"Vim"},
  {link:"https://web.telegram.org/k/",image:"/assets/telegram.png",app:"Telegram"},
  {link:"https://open.spotify.com/",image:"/assets/spotify.png",app:"Spotify"},
  {link:"	https://www.figma.com/",image:"/assets/figma.png",app:"Figma Linux"},
  {link:"https://web.whatsapp.com/",image:"/assets/brave.png",app:"WhatsApp Web"},
  {link:"https://vscode.dev/",image:"/assets/code-oss.png",app:"Code-OSS"},
  {image:"/assets/tmaster.png",app:"TypingMaster Pro"},
  {link:"https://discord.com/app",image:"/assets/discord.png",app:"Discord"},
  {image:"/assets/sticky.png",app:"Sticky Notes"},
  {link:"https://www.notion.so/",image:"/assets/notion.png",app:"Notion"},  
  {image:"/assets/firefox.png",app:"Firefox"}
]


//weather api https://wttr.in/Delhi?format=j1

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
  document.body.style.backgroundImage = `url('bg/1.jpg')`;
};


favData.forEach(e => {
  const card = document.createElement("a");
  if(e.link)card.setAttribute("href", e.link);
  card.innerHTML = `<div class="card"><img src="${e.image}"><p>${e.app}</p></div>`;
  fav.appendChild(card);
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

function loadIframeInBody(url) {
  const existing = document.getElementById("preview-iframe");
  if (existing) existing.remove();

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.id = "preview-iframe";
  iframe.width = "600";
  iframe.height = "400";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.border = "2px solid #333";
  iframe.style.zIndex = "9999";
  iframe.style.background = "white";
  iframe.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  iframe.loading = "lazy";

  document.body.appendChild(iframe);
}