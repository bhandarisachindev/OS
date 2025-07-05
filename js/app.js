import { favData, catData, filesData } from "./data.js";
import {
  updateTimeAndDate,
  bgChange,
  getUserCity,
  fetchWeather,
  viewCalender,
  toggleWeather,
  launchApp,
  makeDraggableResizable,
} from "./functions.js";
import { colourPicker } from "./color.js";


const bottomBar = document.querySelector(".bottom-bar");
const topBar = document.querySelector(".top-bar");
const dateTime = document.querySelector(".datetime-widget");
const calendarEl = document.getElementById("calendar");
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
const code = document.getElementById("vscode");
const openApp = document.getElementById("open-apps");
const volumeBar = document.getElementById("volume-bar");
const volumeIcon = document.getElementById("volume-bar-icon");
const volumeStatus = document.getElementById("volume-status");
const topBarEle = document.querySelectorAll(".top-bar-ele");
const nightBrightnessBar = document.getElementById("night-bright-bar");
const brightBar = document.getElementById("bright-bar");
const togglBright = document.getElementById("toggle-brightness");
const toggleWifi = document.getElementById("toggle-wifi");
const filesApp = document.querySelector(".files-toggle");
const codeApp = document.querySelector(".code-toggle");
const createInput = document.getElementById("create-input");
const createFolder = document.getElementById("create-folder");
const createText = document.getElementById("create-text");
const createHtml = document.getElementById("create-html");
const createButton = document.getElementById("create-button");



let filesResize = makeDraggableResizable(filesApp);
let codeResize = makeDraggableResizable(codeApp);

let zFlie=101,zCode=101;

let logoutState = false,
  calendarState = false,
  appMenuStatus = false,
  wState = false,
  colorState = false,
  notesState = false,
  clipState = false,
  volumeBarStatus = false,
  brightnessBarStatus = false,
  nightLight = false,
  wifiStatus = false,
  browserStatus=false,
  createState=false;
let calendar, city, weatherData, wIcon;
let fileFS = false,
  codeFS = false;
const clipBoard = [];
let volume = 0,
  brightness = 0,
  nightBrightness = 0.3;

(function () {
  const img = new Image();
  img.src = "../assets/icons/games-app.avif";
  img.onload = () => {};
  img.onerror = () => {
    alert(
      "Your browser does not support AVIF images.\n\n" +
        "This webpage is focused on delivering high performance and modern features, " +
        "rather than compatibility with all devices. For the best experience, please update your browser."
    );
  };
})();

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "c") {
    let selectedText = window.getSelection().toString();
    if (selectedText && selectedText != "") {
      clipBoard.push(selectedText);
      clipBoardUpdate();
    }
  }
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
  handleActiveStates(e);  
 if(!codeFS && !fileFS && !createState){
   const ele= document.querySelector(".rightClick");
    ele.style.display="flex";
    ele.style.top=`${e.clientY}px`;
    ele.style.left=`${e.clientX}px`;
 }
});

document.addEventListener("DOMContentLoaded", async function () {
  colourPicker();
  clipBoardUpdate();
  volumeBarIcon();
  stopMouseEvents(bottomBar);
  stopMouseEvents(topBar);
  stopTopBarUtiEvents();

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

favData.forEach((e) => {
  const card = document.createElement("a");
  if (e.link) card.setAttribute("href", e.link);
  card.innerHTML = `<div class="card"><img src="${e.image}"><p>${e.app}</p></div>`;
  fav.appendChild(card);
});

catData.forEach((e) => {
  const card = document.createElement("div");
  card.className = "app-cat-card";
  card.innerHTML = `<img src="${e.image}"><p>${e.title}</p>`;
  catContainer.appendChild(card);
});

toggleWifi.addEventListener("click", (e) => toggleOrHideWifi(e));
togglBright.addEventListener("click", (e) => toggleOrHideBright(e));
document
  .getElementById("toggle-audio")
  .addEventListener("click", (e) => toggleOrHideVolume(e));

dateTime.addEventListener("click", (e) => {
  calendarState = viewCalender(e, calendarState, calendarEl, calendar);
});

wToogle.addEventListener("click", (e) => {
  wState = toggleWeather(e, wState);
});

appLaunch.addEventListener("click", (e) => {
  e.stopPropagation();
  const ele= document.querySelector(".rightClick");
  ele.style.display="none";
  appMenuStatus = launchApp(e, appMenuStatus, appMenu);
});

document.getElementById("toggle-notes").addEventListener("click", (e) => {
  e.stopPropagation();
  clipBoardToggle(e);
});

window.addEventListener("click", e =>handleActiveStates(e));

calendarEl.addEventListener("click", (e) => e.stopPropagation());
document
  .querySelector(".weather-card")
  ?.addEventListener("click", (e) => e.stopPropagation());
appMenu.addEventListener("click", (e) => e.stopPropagation());
files.addEventListener("click", (e) => {
  e.stopPropagation();
});

volumeIcon.addEventListener("click", () => {
  if (volume == 0) volume = 1;
  else volume = 0;
  volumeBar.value = volume;
  volumeStatus.innerHTML = `${(volume * 100).toFixed(0)}%`;
  volumeBarIcon();
});

volumeBar.addEventListener("change", (e) => {
  volume = e.target.value;
  volumeStatus.innerHTML = `${(volume * 100).toFixed(0)}%`;
  volumeBarIcon();
});

brightBar.addEventListener("change", () => {
  const percent = brightBar.value;
  brightness = ((100 - percent) / 100) * 0.7;
  document.getElementById("top-brightness").style.opacity = brightness;
  document.getElementById("bright-per").innerHTML = `${percent}%`;
});

nightBrightnessBar.addEventListener("change", () => {
  const percent = nightBrightnessBar.value;
  nightBrightness = 0.2 + (percent / 100) * (0.4 - 0.2);
  if (nightLight)
    document.getElementById("top-brightness").style.opacity = nightBrightness;
  document.getElementById("night-bright-per").innerHTML = `${percent}%`;
});

document.getElementById("bright-toggle").addEventListener("change", () => {
  toggleNightLight();
});

function clipBoardUpdate() {
  const clipBoardContainer = document.getElementById("clip-board");
  clipBoardContainer.innerHTML = "";

  if (clipBoard.length <= 0) {
    clipBoardContainer.innerHTML =
      "There's nothing on your clipboard. Copy something to get started!";
  } else {
    clipBoard.forEach((e, index) => {
      const text = document.createElement("p");

      const span = document.createElement("span");
      span.textContent = e;

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "ri-delete-bin-line";
      deleteIcon.style.cursor = "pointer";

      deleteIcon.addEventListener("click", () => {
        clipBoard.splice(index, 1);
        clipBoardUpdate();
      });

      text.appendChild(span);
      text.appendChild(deleteIcon);
      clipBoardContainer.appendChild(text);
    });
  }
}

function clipBoardToggle(e) {
  if (e) e.stopPropagation();
  const clipBoardEl = document.getElementById("clip-board");
  if (clipState) {
    clipBoardEl.style.display = "none";
    clipState = false;
  } else {
    // Close all other toggles first
    closeAllTogglesExcept("clipboard");
    clipBoardEl.style.display = "flex";
    clipState = true;
  }
}

function stopMouseEvents(target) {
  target.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  target.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );
}

function volumeBarIcon() {
  if (volume == 0) {
    volumeIcon.classList.remove("ri-volume-up-fill");
    volumeIcon.classList.add("ri-volume-mute-fill");
  } else {
    volumeIcon.classList.remove("ri-volume-mute-fill");
    volumeIcon.classList.add("ri-volume-up-fill");
  }
}

function toggleNightLight() {
  nightLight = !nightLight;
  document.getElementById("top-brightness").style.backgroundColor = nightLight
    ? "#FFCC80"
    : "black";
  document.getElementById("top-brightness").style.opacity = nightLight
    ? nightBrightness
    : brightness;
}

function toggleOrHideBright(e, forceHide = false) {
  e.stopPropagation();
  if (forceHide) {
    brightnessBarStatus = false;
    document.getElementById("bright").style.display = "none";
  } else {
    closeAllTogglesExcept("bright");
    brightnessBarStatus = !brightnessBarStatus;
    document.getElementById("bright").style.display = brightnessBarStatus
      ? "flex"
      : "none";
  }
}

function toggleOrHideVolume(e, forceHide = false) {
  e.stopPropagation();
  if (forceHide) {
    volumeBarStatus = false;
    document.getElementById("volume").style.display = "none";
  } else {
    closeAllTogglesExcept("volume");
    volumeBarStatus = !volumeBarStatus;
    document.getElementById("volume").style.display = volumeBarStatus
      ? "flex"
      : "none";
  }
}

function toggleOrHideWifi(e, forceHide = false) {
  e.stopPropagation();
  if (forceHide) {
    wifiStatus = false;
    document.getElementById("wifi").style.display = "none";
  } else {
    closeAllTogglesExcept("wifi");
    wifiStatus = !wifiStatus;
    document.getElementById("wifi").style.display = wifiStatus
      ? "flex"
      : "none";
  }
}

function closeAllTogglesExcept(exceptToggle) {
  if (exceptToggle !== "wifi" && wifiStatus) {
    wifiStatus = false;
    document.getElementById("wifi").style.display = "none";
  }

  if (exceptToggle !== "bright" && brightnessBarStatus) {
    brightnessBarStatus = false;
    document.getElementById("bright").style.display = "none";
  }

  if (exceptToggle !== "volume" && volumeBarStatus) {
    volumeBarStatus = false;
    document.getElementById("volume").style.display = "none";
  }

  if (exceptToggle !== "clipboard" && clipState) {
    clipState = false;
    document.getElementById("clip-board").style.display = "none";
  }
}

function stopTopBarUtiEvents(){
  const topBarUti = document.querySelector("top-bar-uti");
  if (topBarUti) {
    const allDivs = topBarUti.querySelectorAll("div");
    allDivs.forEach((div) => {
      div.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      div.addEventListener(
        "contextmenu",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        { passive: false }
      );
    });
  }
}




function topBottom() {
  const ele= document.querySelector(".rightClick");
  ele.style.display="none";
  if (fileFS || codeFS){
    topBar.style.top = "-30px";
    bottomBar.style.bottom = "-65px";
    bottomBar.style.borderBottom = "20px solid #1E1E1E";
    bottomBar.style.borderTop = "20px solid #1E1E1E";
  } else {
    topBar.style.top = "0px";
    bottomBar.style.bottom = "16px";
    bottomBar.style.borderBottom = "none";
    bottomBar.style.borderTop = "none";
  }
}



topBar.addEventListener("mouseover", () => {
  topBar.style.top = "0px";
});

topBar.addEventListener("click", () => {
  topBar.style.top = "0px";
});

topBar.addEventListener("mouseleave", () => {
  if ((fileFS || codeFS) &&
  !calendarState &&
  !wState &&
  !colorState &&
  !notesState &&
  !clipState &&
  !volumeBarStatus &&
  !brightnessBarStatus &&
  !wifiStatus
  ) topBar.style.top = "-30px";
});

bottomBar.addEventListener("mouseover", () => {
 if (fileFS || codeFS) bottomBar.style.bottom = "4px";
});

bottomBar.addEventListener("mouseleave", () => {
  if ((fileFS || codeFS) && !appMenuStatus) bottomBar.style.bottom = "-65px";
});


document.querySelectorAll(".app-bar-close").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.stopPropagation();
    const appsDiv = e.currentTarget.closest(".apps-div");
    if (appsDiv) {
      appsDiv.style.display = "none";
    }
    if (appsDiv.classList.contains("files-toggle")) fileFS = !fileFS;
    if (appsDiv.classList.contains("code-toggle")) codeFS = !codeFS;
    topBottom();
  });
});

document.querySelectorAll(".app-bar-resize").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.stopPropagation();
    const appsDiv = e.currentTarget.parentElement.parentElement.parentElement;
    if(appsDiv.classList.contains("files-toggle")){
      if(fileFS){
        filesApp.style.height = "350px";
        filesApp.style.width = "700px";
        filesResize.setEnabled(true);
        fileFS=false;
      }else{
        filesApp.style.height = "100%";
        filesApp.style.width = "100%";
        filesApp.style.top="0";
        filesApp.style.left="0";
        filesResize.setEnabled(false);
        fileFS=true;
      }
      
    }else if(appsDiv.classList.contains("code-toggle")){
      if(codeFS){
        codeApp.style.height = "350px";
        codeApp.style.width = "700px";
        codeApp.style.top="200px";
        codeApp.style.left="100px";
        codeResize.setEnabled(true);
        codeFS=false;
      }else{
        codeApp.style.height = "100%";
        codeApp.style.width = "100%";
        codeApp.style.top="0";
        codeApp.style.left="0";
        codeResize.setEnabled(false);
        codeFS=true;
      }
    }
    topBottom();
  });
});



files.addEventListener("click", (e) => {
  filesApp.style.display = "block";
  filesApp.style.height = "100%";
  filesApp.style.width = "100%";
  filesApp.style.top="0";
  filesApp.style.left="0";
  fileFS = true;
  filesApp.style.zIndex=2;
  fileZIndex();
  filesResize.setEnabled(false);
  topBottom();
  appMenuStatus=true;
  appMenuStatus = launchApp(e, appMenuStatus, appMenu);
});

code.addEventListener("click", (e) => {
  codeApp.style.display = "block";
  codeApp.style.height = "100%";
  codeApp.style.width = "100%";
  codeApp.style.top="0";
  codeApp.style.left="0";
  codeResize.setEnabled(false);
  codeFS=true;
  codeApp.style.zIndex=1;
  codeZIndex();
  topBottom();
  appMenuStatus=true;
  appMenuStatus = launchApp(e, appMenuStatus, appMenu);

});



codeApp.addEventListener("click",(e)=>{
  codeZIndex();
  handleActiveStates(e) 
});

filesApp.addEventListener("click",(e)=>{
  fileZIndex();
  handleActiveStates(e);
});

function getZIndex(){
  zCode=codeApp.style.zIndex;
  zFlie=filesApp.style.zIndex;
}

function fileZIndex(){
  getZIndex();
  if(zFlie<zCode){
    filesApp.style.zIndex=Number(zCode)+1;
    codeApp.style.zIndex=Number(zFlie)-1;
    console.log("file",filesApp.style.zIndex);
    getZIndex()
  }
};

function codeZIndex(){
  getZIndex();
  if(zFlie>zCode){
    filesApp.style.zIndex;
    filesApp.style.zIndex=Number(zCode)-1;
    codeApp.style.zIndex=Number(zFlie)+1;
    console.log("code",codeApp.style.zIndex);
    getZIndex();
  }
}


function handleActiveStates(e) {
    const ele= document.querySelector(".rightClick");
    ele.style.display="none";
  if (
    logoutState ||
    calendarState ||
    wState ||
    colorState ||
    notesState ||
    clipState ||
    appMenuStatus ||
    volumeBarStatus ||
    brightnessBarStatus ||
    wifiStatus ||
    browserStatus ||
    createState
  ) {
    browserStatus=true;
    logoutState = true;
    calendarState = true;
    appMenuStatus = true;
    wState = true;
    appMenuStatus=true;
    colorState = true;
    notesState = true;
    createState=true;

    closeAllTogglesExcept("");
    wState = toggleWeather(e, wState);
    appMenuStatus = launchApp(e, appMenuStatus, appMenu);
    calendarState = viewCalender(e, calendarState, calendarEl, calendar);
    closeAllTogglesExcept("");
    topBottom();
    document.getElementById("browser").style.display="none";

    createState=false;
    browserStatus=false;
  }
}

document.getElementById("Wallpaper-change").addEventListener("click",bgChange);


let folderCount=0,textCount=0,htmlCount=0;


createHtml.addEventListener("click",e=>{
  createInput.style.display="flex";
  const input = document.getElementById("title-input");
  input.focus();
  document.getElementById("radio-html").checked= true;
  createState=true;
});

createText.addEventListener("click",e=>{
  createInput.style.display="flex";
  const input = document.getElementById("title-input");
  input.focus();
  document.getElementById("radio-text").checked= true;
  createState=true;
});

createFolder.addEventListener("click",e=>{
  createInput.style.display="flex";
  const input = document.getElementById("title-input");
  input.focus();
  document.getElementById("radio-folder").checked= true;
  createState=true;
});


document.getElementById("cancel-creation").addEventListener("click",(e)=>{
  createInput.style.display="none";
  createState=false;
});

createButton.addEventListener("click", createDesktopItem);

document.getElementById("title-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createDesktopItem();
  }
});

function createDesktopItem() {
  let title = document.getElementById("title-input").value;
  if (title.trim() === "") return alert("Title is required");

  const checkedRadio = document.querySelector('input[name="type"]:checked').value;
  let logo, suffix, type, src;

  if (checkedRadio === "folder") {
    logo = "ri-folder-line"; suffix = ""; type = "folder";
    src = "assets/icons/folder.avif";
  }
  if (checkedRadio === "text") {
    logo = "ri-file-text-line"; suffix = ".txt"; type = "file";
    src = "assets/icons/text.svg";
  }
  if (checkedRadio === "html") {
    logo = "ri-html5-line"; suffix = ".html"; type = "file";
    src = "assets/icons/html.svg";
  }

  title = title + suffix;
  let obj = { name: title, type: type, icon: logo };
  filesData.desktop.push(obj);

  let newEle = document.createElement("div");
  newEle.classList.add("window-app");
  newEle.innerHTML = `
    <img src="${src}" alt="${title}">
    <p>${title}</p>
  `;
  document.getElementById("container").appendChild(newEle);

  document.getElementById("title-input").value = null;
  createInput.style.display="none";
  createState=false;
};


document.getElementById("close-browser").addEventListener("click",()=>{
  document.getElementById("browser").style.display="none";
  browserStatus=false;
});


document.getElementById("search").addEventListener("click",(e)=>{
  handleActiveStates(e);
  document.getElementById("browser").style.display="flex";
  browserStatus=true;
});
