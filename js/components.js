class topBar extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="top-bar">
        <div id="weather-toggle">
          <img id="weather-toggle-icon" src="assets/icons/Weather/day.svg">
        </div>
        <div class="navs">
        <img id="toggle-picker" class="top-ele toggle-btn" title="Toggle color picker" src="/assets/icons/colour-picker-svgrepo-com.svg">
        <img id="toggle-notes" class="top-ele" src="/assets/icons/clipboard-svgrepo-com.svg">
        <img id="toggle-audio" class="top-ele" src="/assets/icons/audio-volume-high-symbolic.svg">
        <img id="toggle-brightness" class="top-ele" src="/assets/icons/brightness-svgrepo-com.svg">
        <img id="toggle-wifi" class="top-ele" src="/assets/icons/wifi-high-svgrepo-com.svg">
        <div class="top-ele datetime-widget" >
          <div id="time">00:00</div>
          <div id="date">June 21, 2025</div>
        </div>
        <img class="top-ele" id="lock-btn" src="/assets/icons/lock.svg">
        <img class="top-ele" id="logout-btn" src="/assets/icons/left-arrow-direction-svgrepo-com.svg">
        </div>
      </div>`
    }
  }

  
  //bottom-bar
  
  class bottomBar extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="bottom-bar">
        <img id="app-launch" src="/assets/icons/zwlogo.avif">
        <img id="files" src="/assets/icons/folder.avif" >
        <img id="vscode" src="/assets/icons/code-oss.avif" >
        <img id="search" src="/assets/icons/google-chrome.avif" >
      </div>`
    }
  }
  

  
  //app-menu
  class appMenu extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div id="app-menu">
        <div id="app-top">
          <div>
          <img src="/assets/icons/pin-svgrepo-com.svg">
          <img src="/assets/icons/setting-config-svgrepo-com.svg">
          <span>🔍<input type="text" placeholder=" Search..."></span>
          </div>
         <a href="https://github.com/bhandarisachindev" target="_blank" rel="noopener noreferrer"><i class="ri-github-fill"></i> bhandarisachindev</a>
        </div>
        <div id="app-mid-container">
       
          <div id="app-mid">
           <p>Note: The following is dummy data.</p>
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
            <img src="/assets/icons/applications-development.avif">
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
  

  
  //weather-card
  
  class weatherCard extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`<div class="weather-card">
        <div id="weather-city">Loading...</div>
        <div id="weather">
          <p id="temp">36&degC</p>
          <span id="image-conatiner">
            <img id="weather-icon" src="/assets/icons/Weather/day.svg">
            <p id="weather-title"></p>
          </span>
          <span id="weather-details">
            <p id="humidity">Humidity: 90%</p>
            <p id="pressure">Pressure: 100 hPa</p>
          </span>
        </div>
        <div id="upcoming-weather">
        </div>
      </div>`
    }
  }
  
 
  
  
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



class fileManager extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="file-explorer">
  <div class="sidebar">
    <div class="places-header">Places</div>
    <div class="sidebar-item active">
      <i class="ri-home-line"></i>
      <span>Home</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-download-line"></i>
      <span>Downloads</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-computer-line"></i>
      <span>Desktop</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-delete-bin-line"></i>
      <span>Trash</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-film-line"></i>
      <span>Media</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-headphone-line"></i>
      <span>Audio</span>
    </div>
    <div class="divider"></div>
    <div class="places-header">Remote</div>
    <div class="sidebar-item">
      <i class="ri-global-line"></i>
      <span>Network</span>
    </div>
    <div class="divider"></div>
    <div class="places-header">Recent</div>
    <div class="sidebar-item">
      <i class="ri-file-list-line"></i>
      <span>Recent Files</span>
    </div>
    <div class="sidebar-item">
      <i class="ri-map-pin-line"></i>
      <span>Recent Locations</span>
    </div>
    <div class="divider"></div>
    <div class="places-header">Devices</div>
    <div class="sidebar-item">
      <i class="ri-hard-drive-line"></i>
      <span>238.0 GiB Internal Drive (sda6)</span>
    </div>
  </div>
  <div class="main-content-files">
    <div class="header-bar">
      <div class="navigation-controls">
        <button class="nav-button"><i class="ri-arrow-left-s-line"></i></button>
        <button class="nav-button"><i class="ri-arrow-right-s-line"></i></button>
        <button class="nav-button"><i class="ri-home-line"></i> Home</button>
      </div>
      <div class="view-controls">
        <button class="view-button"><i class="ri-split-cells-horizontal"></i> Split</button>
        <button class="view-button"><i class="ri-search-line"></i></button>
        <button class="view-button"><i class="ri-menu-line"></i></button>
      </div>
    </div>
    <div class="files-content">
      <div class="files-container" id="files-container"></div>
    </div>
  </div>
  <div class="folder-count">11 folders</div>
</div>
    `;
  }
}

class appTopBar extends HTMLElement{
  constructor(){
    super()
    this.innerHTML=`    <div class="app-bar">
      <img class="app-bar-resize" src="/assets/icons/app-bar-re.svg">
      <img class="app-bar-close" src="/assets/icons/app-bar-cl.svg">
    </div> `
  }
}


class codeEditor extends HTMLElement{
  constructor(){
    super()
    this.innerHTML=`
            <div class="editor">
        <div class="main-content">
        <div class="tab-bar">
          <div class="tab active" data-filename="script.js">
            <i class="ri-javascript-line"></i> script.js
            <i class="ri-close-line close-tab"></i>
          </div>
          
          <div class="run-panel">
          <button id="run-code" class="run-button">
          <i class="ri-play-line"></i> Run Code
          </button>
          </div>
        </div>

        <div class="editor-area">
          <textarea class="endEvent" id="code-editor" spellcheck="false">
                    // Write your JavaScript code here
        console.log('Hello! Harsh Bhaiya');</textarea>
        </div>

        <div class="status-bar">
          <div class="left">
            <span class="status-item"><i class="ri-git-branch-line"></i> main</span>
            <span class="status-item"><i class="ri-check-line"></i> 0 errors, 0 warnings</span>
          </div>
          <div class="right">
            <span class="status-item">JavaScript</span>
            <span class="status-item">UTF-8</span>
            <span class="status-item">Ln 1, Col 1</span>
          </div>
        </div>
        </div>

        <div class="terminal-panel">
        <div class="terminal-header">
          <div class="terminal-tabs">
            <div class="terminal-tab active">TERMINAL</div>
            <div class="terminal-tab">OUTPUT</div>
            <div class="terminal-tab">PROBLEMS</div>
          </div>
          <div class="terminal-actions">
            <i class="ri-add-line" title="New Terminal"></i>
            <i class="ri-delete-bin-line" title="Clear Terminal"></i>
            <i class="ri-arrow-down-s-line" title="Minimize"></i>
            <i class="ri-arrow-up-s-line" title="Maximize" id="maximize-terminal"></i>
            <i class="ri-arrow-down-s-line" title="Restore" id="restore-terminal" style="display: none;"></i>
          </div>
        </div>
        <div class="terminal-content">
          <div id="terminal-output"></div>
        </div>
        </div>
        </div>

        
    `
  }
}

 class topBarUti extends HTMLElement{
    constructor(){
      super()
      this.innerHTML=`
    <div id="clip-board"></div>
    <div id="calendar"></div>
    <div class="top-bar-ele" id="volume">
      <span>
        <i id="volume-bar-icon" class="ri-volume-up-fill"></i>
        <input id="volume-bar" type="range" name="volume" min="0" max="1" step="0.01" value="0">
        <p id="volume-status">0%</p>
      </span>
    </div>

    <div class="top-bar-ele" id="bright">
      <span><i class="ri-sun-line"></i> <input id="bright-bar" type="range" name="volume" min="0" max="100" step="1" value="100"> <p id="bright-per">100%</p></span>
      <span >
        Night Light 
        <label class="switch">
          <input type="checkbox" id="bright-toggle">
          <span class="slider"></span>
        </label>
      </span>
      <p>Night Light Temperature</p>
      <span id="night-light"><i class="ri-sun-line"></i> <input id="night-bright-bar" type="range"  name="volume" min="0" max="100" step="1" value="100"> <p id="night-bright-per">100%</p></span>
    </div>

    <div class="top-bar-ele" id="wifi">
      <div>Airtel_001 <span>connected <i class="ri-pencil-fill"></i></span> </div>
      <div>GalaxyNet <span>connect</span></div>
      <div>CoffeeShopWiFi <span>connect</span></div>
      <div>HomeSweetHome <span>connect</span></div>
      <div>OfficeSecure <span>connect</span></div>
      <div>GuestNetwork <span>connect</span></div>
      <div>HiddenSSID <span>connect</span></div>
    </div> 
      `
    }
  }

customElements.define("code-editor",codeEditor);
customElements.define("top-bar-uti",topBarUti);
customElements.define("app-top-bar",appTopBar);
customElements.define("files-app",fileManager);
customElements.define("color-picker",colorPicker);
customElements.define("weather-card",weatherCard);
customElements.define("top-bar",topBar);
customElements.define("bottom-bar",bottomBar);
customElements.define("app-menu",appMenu);
customElements.define("log-out",logOut);