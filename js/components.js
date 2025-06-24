
class topBar extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="top-bar">
        <div id="weather-toggle">
          <img id="weather-toggle-icon" src="assets/Weather/day.svg">
        </div>
        <div class="navs">
        <img id="toggle-picker" class="top-ele toggle-btn" title="Toggle color picker" src="/assets/colour-picker-svgrepo-com.svg">
        <img id="toggle-notes" class="top-ele" src="/assets/clipboard-svgrepo-com.svg">
        <img class="top-ele" src="/assets/audio-volume-high-symbolic.svg">
        <img class="top-ele" src="/assets/brightness-svgrepo-com.svg">
        <img class="top-ele" src="/assets/wifi-high-svgrepo-com.svg">
        <img class="top-ele" id="otherData" src="/assets/down-arrow-backup-2-svgrepo-com.svg">
        <div class="top-ele datetime-widget" >
          <div id="time">00:00</div>
          <div id="date">June 21, 2025</div>
        </div>
        <img class="top-ele" src="/assets/lock.svg">
        <img class="top-ele" id="logout-btn" src="/assets/left-arrow-direction-svgrepo-com.svg">
        </div>
      </div>`
    }
  }
  
  customElements.define("top-bar",topBar);
  
  //bottom-bar
  
  class bottomBar extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="bottom-bar">
        <img id="app-launch" src="/assets/archlinux-logo.png">
        <img src="/assets/applications-system.png" >
        <img id="files" src="/assets/folder.png " >
        <img src="/assets/code-oss.png" >
        <img src="/assets/brave.png" >  
        <img src="/assets/discord.png" >
        <img id="music" src="/assets/spotify.png" >
      </div>`
    }
  }
  
  customElements.define("bottom-bar",bottomBar);
  
  //app-menu
  class appMenu extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div id="app-menu">
        <div id="app-top">
          <div>
          <img src="/assets/pin-svgrepo-com.svg">
          <img src="/assets/setting-config-svgrepo-com.svg">
          <span>🔍<input type="text" placeholder=" Search..."></span>
          </div>
         <a href="https://github.com/bhandarisachindev" target="_blank" rel="noopener noreferrer"><i class="ri-github-fill"></i> bhandarisachindev</a>
        </div>
        <div id="app-mid-container">
          <div id="app-mid">
          <p>Note: Most websites block iframe embedding, so you will be redirected to their Website. If there is no associated website, nothing will happen.</p>
          <div id="app-fav"></div>
        </div>
        <div id="app-cat">
          <div class="app-cat-card active">
            <i class="ri-bookmark-line"></i>
            <p>Favorites</p>
          </div>
          <div class="app-cat-card">
            <i class="ri-layout-grid-fill"></i>
            <p>All Applications</p>
          </div>
          <hr style="width: 96%;">
          <div class="app-cat-card">
            <i class="ri-information-line"></i>
            <p>Help</p>
          </div>
          <div class="app-cat-card">
            <img src="/assets/applications-development.png">
            <p>Development</p>
          </div>
        </div>
        </div><div id="app-bottom">
          <div>
            <div class="app-bottom-tag" style="border-top: 2px solid rgb(57, 57, 121);"><i class="ri-layout-grid-fill"></i><p>Application</p></div>
            <div class="app-bottom-tag"><i class="ri-compass-3-line"></i><p>Places</p></div>
          </div>
          <div id="bottom-last">
            <div><i class="ri-logout-box-line"></i><p>Logout</p></div>
            <div><i class="ri-restart-line"></i><p>Restart</p></div>
            <div><i class="ri-shut-down-line"></i><p>Shutdown</p></div>
          </div>
        </div>
      </div>`
    }
  }
  
  customElements.define("app-menu",appMenu);
  
  //weather-card
  
  class weatherCard extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="weather-card">
        <div id="weather-city">Loading...</div>
        <div id="weather">
          <p id="temp">36&degC</p>
          <span id="image-conatiner">
            <img id="weather-icon" src="/assets/Weather/day.svg">
            <p id="weather-title"></p>
          </span>
          <span id="weather-details">
            <p id="humidity">Humidity: 90%</p>
            <p id="pressure">Pressure: 100bar</p>
          </span>
        </div>
        <div id="upcoming-weather">
        </div>
      </div>`
    }
  }
  
  customElements.define("weather-card",weatherCard);
  
  
  //logout 
  
  class logOut extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div>
        <div class="logout">
          <div><i class="ri-github-fill"></i><p>bhandarisachindev</p></div>
          <div class="logout-icons">
            <span ><i class="ri-lock-fill"></i>Lock</span>
            <span class="restart"><i class="ri-restart-line"></i>Restart</span>
            <span ><i class="ri-shut-down-fill"></i>Shut Down</span>
            <span ><i class="ri-logout-box-fill"></i>Log Out</span>
            <span ><i class="ri-close-circle-fill"></i>Cancel</span>
          </div> 
        </div>
      </div>`
    }
  }
  
  customElements.define("log-out",logOut);

  class colorPicker extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="picker-container" id="picker-container">
        <div class="main-container">
            <div class="controls">
                <button id="pick-color">Pick Color</button>
                <div class="instructions">Click the button to activate the color picker</div>
            </div>
            <div class="color-grid" id="color-grid"></div>
        </div>
    </div>`
    }
  }

  customElements.define("color-picker",colorPicker);


  class notesApp extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=``
    }
  }

  customElements.define("notes-app",notesApp);


  