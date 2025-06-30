export const folderData = [
  { name: "Project Documents", path: "/home/user/Documents", deletionTime: "Today, 10:23 AM" },
  { name: "Photos", path: "/home/user/Pictures", deletionTime: "Yesterday, 4:15 PM" },
  { name: "Backup Files", path: "/home/user/Backups", deletionTime: "Jun 20, 2:30 PM" },
  { name: "Old Downloads", path: "/home/user/Downloads", deletionTime: "Jun 18, 11:45 AM" },
  { name: "Presentation", path: "/home/user/Documents/Work", deletionTime: "Jun 15, 9:20 AM" }
];

function createFolderItem(folder) {
  const folderItem = document.createElement('div');
  folderItem.className = 'folder-item';
  folderItem.innerHTML = `
    <i class="ri-folder-line folder-icon"></i>
    <div class="folder-name">${folder.name}</div>
    <div class="folder-path">${folder.path}</div>
    <div class="folder-time">${folder.deletionTime}</div>
  `;
  return folderItem;
}

export function renderFolders() {
  const folderContainer = document.getElementById('folder-container');
  const statusCount = document.getElementById('status-count');

  folderContainer.innerHTML = '';
  const showFolders = Math.random() > 0.5;

  if (showFolders) {
    folderData.forEach(folder => {
      folderContainer.appendChild(createFolderItem(folder));
    });
    statusCount.textContent = `${folderData.length} folders, 0 files`;
    folderContainer.parentElement.classList.add('has-items');
  } else {
    folderContainer.parentElement.classList.remove('has-items');
    statusCount.textContent = '0 folders, 0 files';
  }
}

export const areaComponents = {
  home: {
    title: "Home",
    icon: "ri-home-line",
    content: `
      <div class="area-header">
        <h2>Home</h2>
        <p>Quick access to your files and folders</p>
      </div>
      <div class="area-grid">
        <div class="area-item"><i class="ri-file-text-line"></i><span>Documents</span></div>
        <div class="area-item"><i class="ri-image-line"></i><span>Pictures</span></div>
        <div class="area-item"><i class="ri-music-line"></i><span>Music</span></div>
        <div class="area-item"><i class="ri-video-line"></i><span>Videos</span></div>
        <div class="area-item"><i class="ri-download-line"></i><span>Downloads</span></div>
        <div class="area-item"><i class="ri-cloud-line"></i><span>Cloud Storage</span></div>
      </div>
    `
  },
  downloads: {
    title: "Downloads",
    icon: "ri-download-line",
    content: `
      <div class="area-header">
        <h2>Downloads</h2>
        <p>Recently downloaded files</p>
      </div>
      <div class="file-list">
        <div class="file-item"><i class="ri-file-zip-line"></i><div class="file-details"><div class="file-name">project-archive.zip</div><div class="file-info">Downloaded today, 10.5 MB</div></div></div>
        <div class="file-item"><i class="ri-file-pdf-line"></i><div class="file-details"><div class="file-name">report-2023.pdf</div><div class="file-info">Downloaded yesterday, 2.3 MB</div></div></div>
        <div class="file-item"><i class="ri-image-line"></i><div class="file-details"><div class="file-name">wallpaper.jpg</div><div class="file-info">Downloaded Jun 20, 4.7 MB</div></div></div>
        <div class="file-item"><i class="ri-file-music-line"></i><div class="file-details"><div class="file-name">soundtrack.mp3</div><div class="file-info">Downloaded Jun 18, 8.1 MB</div></div></div>
      </div>
    `
  },
  trash: { title: "Trash", icon: "ri-delete-bin-line", content: null },
};

export function switchArea(areaId) {
  document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('selected'));
  const sidebarItem = document.querySelector(`.sidebar-item[data-area="${areaId}"]`);
  if (sidebarItem) sidebarItem.classList.add('selected');

  const addressBar = document.querySelector('.location-text');
  const areaData = areaComponents[areaId];
  if (addressBar && areaData) addressBar.textContent = areaData.title;

  if (areaId === 'trash') {
    document.getElementById('trash-content').style.display = 'flex';
    document.getElementById('dynamic-content').style.display = 'none';
    return;
  }

  document.getElementById('trash-content').style.display = 'none';
  const dynamicContent = document.getElementById('dynamic-content');
  dynamicContent.style.display = 'block';

  dynamicContent.innerHTML = areaData && areaData.content 
    ? areaData.content 
    : `<div class="empty-message">No content available for ${areaId}</div>`;
}

export function openFileManager() {
  const openApp = document.getElementById("open-apps");
  let currentApp = document.createElement("div");
  currentApp.className = "window";
  currentApp.innerHTML = `
    <app-top-bar></app-top-bar>
    <files-app></files-app>
  `;
  openApp.appendChild(currentApp);

  renderFolders();

  const emptyTrashButton = document.querySelector('.action-button');
  if (emptyTrashButton) {
    emptyTrashButton.addEventListener('click', (e) => {
      e.stopPropagation();
      renderFolders();
    });
  }

  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const areas = Object.keys(areaComponents);

  sidebarItems.forEach((item, index) => {
    if (index < areas.length) {
      item.setAttribute('data-area', areas[index]);
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        switchArea(areas[index]);
      });
    }
  });

  switchArea('home');
}
