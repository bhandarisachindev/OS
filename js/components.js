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
        <img class="top-ele" src="/assets/icons/audio-volume-high-symbolic.svg">
        <img class="top-ele" src="/assets/icons/brightness-svgrepo-com.svg">
        <img class="top-ele" src="/assets/icons/wifi-high-svgrepo-com.svg">
        <img class="top-ele" id="otherData" src="/assets/icons/down-arrow-backup-2-svgrepo-com.svg">
        <div class="top-ele datetime-widget" >
          <div id="time">00:00</div>
          <div id="date">June 21, 2025</div>
        </div>
        <img class="top-ele" src="/assets/icons/lock.svg">
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
        <img src="/assets/icons/applications-system.avif" >
        <img id="files" src="/assets/icons/folder.avif" >
        <img src="/assets/icons/code-oss.avif" >
        <img id="brave" src="/assets/icons/google-chrome.avif" >
        <img id="music" src="/assets/icons/music.avif" >
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
    <div class="file-manager">
      <div class="top-bar-files">
        <div class="left-section">
          <button class="nav-button back-button"><i class="ri-arrow-left-s-line"></i></button>
          <button class="nav-button forward-button"><i class="ri-arrow-right-s-line"></i></button>
          <div class="view-button"><i class="ri-grid-line"></i><i class="ri-arrow-down-s-line dropdown-arrow"></i></div>
        </div>
        <div class="address-bar"><div class="location-text">Trash</div></div>
        <div class="right-section">
          <button class="action-button"><i class="ri-delete-bin-line"></i>Empty Trash</button>
          <button class="action-button split-button"><i class="ri-layout-2-line"></i>Split</button>
          <button class="icon-button search-button"><i class="ri-search-line"></i></button>
          <button class="icon-button menu-button"><i class="ri-menu-line"></i></button>
        </div>
      </div>

      <div class="content">
        <div class="sidebar">
          <div class="sidebar-header">Places</div>
          <div class="sidebar-item" data-area="home"><i class="ri-home-line"></i><span>Home</span></div>
          <div class="sidebar-item" data-area="downloads"><i class="ri-download-line"></i><span>Downloads</span></div>
          <div class="sidebar-item" data-area="code"><i class="ri-code-s-slash-line"></i><span>Code</span></div>
          <div class="sidebar-item" data-area="trash"><i class="ri-delete-bin-line"></i><span>Trash</span></div>
          <div class="sidebar-item" data-area="movie"><i class="ri-film-line"></i><span>Movie</span></div>

          <div class="sidebar-header">Remote</div>
          <div class="sidebar-item" data-area="network"><i class="ri-wifi-line"></i><span>Network</span></div>

          <div class="sidebar-header">Recent</div>
          <div class="sidebar-item" data-area="recent-files"><i class="ri-file-list-line"></i><span>Recent Files</span></div>
          <div class="sidebar-item" data-area="recent-locations"><i class="ri-map-pin-line"></i><span>Recent Locations</span></div>

          <div class="sidebar-header">Devices</div>
          <div class="sidebar-item" data-area="internal-drive"><i class="ri-hard-drive-line"></i><span>238.0 GiB Internal Drive</span></div>
        </div>

        <div class="main-area">
          <div id="trash-content">
            <div class="table-header">
              <div class="column name-column">Name</div>
              <div class="column path-column">Path</div>
              <div class="column deletion-time-column">Deletion Time</div>
            </div>
            <div id="folder-container"></div>
            <div class="empty-message" id="empty-message">Trash is empty</div>
            <div class="status-bar"><span id="status-count">0 folders, 0 files</span></div>
          </div>

          <div id="dynamic-content" style="display:none;"></div>
        </div>
      </div>
    </div>`;
  }
}
  
class searchApp extends HTMLElement{
  constructor(){
    super()
    this.innerHTML=`
      <div id="google"> 
        <div class="google-main"><div class="gcse-search"></div></div>
      </div> `
  }
}

class appTopBar extends HTMLElement{
  constructor(){
    super()
    this.innerHTML=`    <div class="app-bar">
      <img id="app-bar-resize" src="/assets/icons/app-bar-re.svg">
      <img id="app-bar-close" src="/assets/icons/app-bar-cl.svg">
    </div> `
  }
}

customElements.define("app-top-bar",appTopBar);
customElements.define("search-app",searchApp);
customElements.define("files-app",fileManager);
customElements.define("color-picker",colorPicker);
customElements.define("weather-card",weatherCard);
customElements.define("top-bar",topBar);
customElements.define("bottom-bar",bottomBar);
customElements.define("app-menu",appMenu);
customElements.define("log-out",logOut);