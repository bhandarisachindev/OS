import { filesData } from "./data.js"

document.addEventListener('DOMContentLoaded', () => {
  const filesContainer = document.getElementById('files-container');
  const folderCountEl = document.querySelector('.folder-count');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const headerTitle = document.querySelector('.nav-button:nth-child(3)');
  
  let currentLocation = 'home';
  
  init();
  
  function init() {
    renderFiles(filesData[currentLocation]);
    setupSidebarEvents();
    console.log('Available sections:', Object.keys(filesData));
  }
  
  function renderFiles(files) {
    if (!files) {
      console.error(`No data found for section: ${currentLocation}`);
      return;
    }
    
    filesContainer.innerHTML = '';
    
    const fileCount = files.filter(file => file.type === 'file').length;
    const folderCount = files.filter(file => file.type === 'folder').length;
    
    if (fileCount > 0) {
      folderCountEl.textContent = `${folderCount} folders, ${fileCount} files`;
    } else if (folderCount > 0) {
      folderCountEl.textContent = `${folderCount} folders`;
    } else {
      folderCountEl.textContent = `No items`;
    }
    
    headerTitle.innerHTML = `<i class="ri-home-line"></i> ${currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1)}`;
    
    files.forEach(file => {
      const fileElement = createFileElement(file);
      filesContainer.appendChild(fileElement);
    });
  }
  
  function createFileElement(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.setAttribute('data-name', file.name);
    fileItem.setAttribute('data-type', file.type);
    
    const iconContainer = document.createElement('div');
    iconContainer.className = `file-icon ${file.category || ''}`;
    
    const icon = document.createElement('i');
    icon.className = file.icon;
    iconContainer.appendChild(icon);
    
    const fileName = document.createElement('div');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    fileItem.appendChild(iconContainer);
    fileItem.appendChild(fileName);
    
    fileItem.addEventListener('click', () => {
      handleFileClick(file);
    });
    
    return fileItem;
  }
  
  function handleFileClick(file) {
    if (file.type === 'folder') {
      const folderName = file.name.toLowerCase();
      if (filesData[folderName]) {
        navigateToSection(folderName);
      } else {
        showModal(file.name, file.type);
      }
    } else {
      showModal(file.name, file.type);
    }
  }
  
  function navigateToSection(sectionName) {
    currentLocation = sectionName;
    renderFiles(filesData[currentLocation]);
    updateSidebarActive(sectionName);
    console.log(`Navigated to section: ${sectionName}`);
  }
  
  function updateSidebarActive(name) {
    let found = false;
    
    sidebarItems.forEach(item => {
      const itemText = item.querySelector('span').textContent.toLowerCase();
      if (itemText === name) {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        found = true;
      }
    });
    
    if (!found) {
      console.log(`No sidebar item found for: ${name}`);
    }
  }
  
  function setupSidebarEvents() {
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        const name = item.querySelector('span').textContent.toLowerCase();
        
        console.log(`Clicked sidebar item: ${name}`);
        
        if (name === 'trash') {
          if (!filesData['trash']) {
            filesData['trash'] = [];
          }
          navigateToSection('trash');
        } else if (filesData[name]) {
          navigateToSection(name);
        } else {
          console.warn(`No data found for section: ${name}`);
          navigateToSection('home');
        }
      });
    });
  }
  
  function showModal(name, type) {
    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('.overlay');
    
    if (!modal) {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      
      modal = document.createElement('div');
      modal.className = 'modal';
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', closeModal);
      
      const content = document.createElement('div');
      content.className = 'modal-content';
      
      modal.appendChild(closeBtn);
      modal.appendChild(content);
      document.body.appendChild(modal);
      
      overlay.addEventListener('click', closeModal);
    }
    
    const content = modal.querySelector('.modal-content');
    
    if (type === 'folder') {
      content.innerHTML = `
        <h2>Folder: ${name}</h2>
        <p>Data marked with * is demo data.</p>
        <p>In a real app, clicking this would open the "${name}" folder.</p>
      `;
    } else {
      content.innerHTML = `
        <h2>File: ${name}</h2>
        <p>Data marked with * is demo data.</p>
        <p>In a real app, clicking this would open the "${name}" file.</p>
      `;
    }
    
    modal.style.display = 'block';
    overlay.style.display = 'block';
  }
  
  function closeModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
  }

  function addToDesktop(fileObj) {
    if (!fileObj.name.includes('*')) {
      filesData['desktop'].push(fileObj);
      if (currentLocation === 'desktop') {
        renderFiles(filesData['desktop']);
      }
    }
  }
  
  function addToMedia(fileObj) {
    if (!fileObj.name.includes('*')) {
      filesData['media'].push(fileObj);
      if (currentLocation === 'media') {
        renderFiles(filesData['media']);
      }
    }
  }
  
  function addToAudio(fileObj) {
    if (!fileObj.name.includes('*')) {
      filesData['audio'].push(fileObj);
      if (currentLocation === 'audio') {
        renderFiles(filesData['audio']);
      }
    }
  }
  
  function addToTrash(fileObj) {
    if (!fileObj.name.includes('*')) {
      if (!filesData['trash']) {
        filesData['trash'] = [];
      }
      filesData['trash'].push(fileObj);
      if (currentLocation === 'trash') {
        renderFiles(filesData['trash']);
      }
    }
  }
});
