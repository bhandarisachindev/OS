const folderData = [
    {
        name: "Project Documents",
        path: "/home/user/Documents",
        deletionTime: "Today, 10:23 AM"
    },
    {
        name: "Photos",
        path: "/home/user/Pictures",
        deletionTime: "Yesterday, 4:15 PM"
    },
    {
        name: "Backup Files",
        path: "/home/user/Backups",
        deletionTime: "Jun 20, 2:30 PM"
    },
    {
        name: "Old Downloads",
        path: "/home/user/Downloads",
        deletionTime: "Jun 18, 11:45 AM"
    },
    {
        name: "Presentation",
        path: "/home/user/Documents/Work",
        deletionTime: "Jun 15, 9:20 AM"
    }
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

function renderFolders() {
    const folderContainer = document.getElementById('folder-container');
    const emptyMessage = document.getElementById('empty-message');
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

document.addEventListener('DOMContentLoaded', () => {
    renderFolders();
    
    const emptyTrashButton = document.querySelector('.action-button');
    emptyTrashButton.addEventListener('click', () => {
        renderFolders();
    });
}); 

// Component data for different areas
const areaComponents = {
    home: {
        title: "Home",
        icon: "ri-home-line",
        content: `
            <div class="area-header">
                <h2>Home</h2>
                <p>Quick access to your files and folders</p>
            </div>
            <div class="area-grid">
                <div class="area-item">
                    <i class="ri-file-text-line"></i>
                    <span>Documents</span>
                </div>
                <div class="area-item">
                    <i class="ri-image-line"></i>
                    <span>Pictures</span>
                </div>
                <div class="area-item">
                    <i class="ri-music-line"></i>
                    <span>Music</span>
                </div>
                <div class="area-item">
                    <i class="ri-video-line"></i>
                    <span>Videos</span>
                </div>
                <div class="area-item">
                    <i class="ri-download-line"></i>
                    <span>Downloads</span>
                </div>
                <div class="area-item">
                    <i class="ri-cloud-line"></i>
                    <span>Cloud Storage</span>
                </div>
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
                <div class="file-item">
                    <i class="ri-file-zip-line"></i>
                    <div class="file-details">
                        <div class="file-name">project-archive.zip</div>
                        <div class="file-info">Downloaded today, 10.5 MB</div>
                    </div>
                </div>
                <div class="file-item">
                    <i class="ri-file-pdf-line"></i>
                    <div class="file-details">
                        <div class="file-name">report-2023.pdf</div>
                        <div class="file-info">Downloaded yesterday, 2.3 MB</div>
                    </div>
                </div>
                <div class="file-item">
                    <i class="ri-image-line"></i>
                    <div class="file-details">
                        <div class="file-name">wallpaper.jpg</div>
                        <div class="file-info">Downloaded Jun 20, 4.7 MB</div>
                    </div>
                </div>
                <div class="file-item">
                    <i class="ri-file-music-line"></i>
                    <div class="file-details">
                        <div class="file-name">soundtrack.mp3</div>
                        <div class="file-info">Downloaded Jun 18, 8.1 MB</div>
                    </div>
                </div>
            </div>
        `
    },
    code: {
        title: "Code",
        icon: "ri-code-s-slash-line",
        content: `
            <div class="area-header">
                <h2>Code Projects</h2>
                <p>Your development projects</p>
            </div>
            <div class="project-list">
                <div class="project-item">
                    <i class="ri-html5-line"></i>
                    <div class="project-details">
                        <div class="project-name">Website Redesign</div>
                        <div class="project-info">Modified 2 days ago</div>
                    </div>
                </div>
                <div class="project-item">
                    <i class="ri-reactjs-line"></i>
                    <div class="project-details">
                        <div class="project-name">React Dashboard</div>
                        <div class="project-info">Modified 5 days ago</div>
                    </div>
                </div>
                <div class="project-item">
                    <i class="ri-python-line"></i>
                    <div class="project-details">
                        <div class="project-name">Data Analysis</div>
                        <div class="project-info">Modified 1 week ago</div>
                    </div>
                </div>
                <div class="project-item">
                    <i class="ri-android-line"></i>
                    <div class="project-details">
                        <div class="project-name">Mobile App</div>
                        <div class="project-info">Modified 2 weeks ago</div>
                    </div>
                </div>
            </div>
        `
    },
    trash: {
        title: "Trash",
        icon: "ri-delete-bin-line",
        content: null
    },
    movie: {
        title: "Movie",
        icon: "ri-film-line",
        content: `
            <div class="area-header">
                <h2>Movies</h2>
                <p>Your video collection</p>
            </div>
            <div class="movie-grid">
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">Interstellar</div>
                </div>
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">The Matrix</div>
                </div>
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">Inception</div>
                </div>
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">Avatar</div>
                </div>
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">Dune</div>
                </div>
                <div class="movie-item">
                    <div class="movie-thumbnail" style="background-color: #3a4149;">
                        <i class="ri-movie-line"></i>
                    </div>
                    <div class="movie-name">Blade Runner 2049</div>
                </div>
            </div>
        `
    },
    notes: {
        title: "Notes",
        icon: "ri-sticky-note-line",
        content: `
            <div class="area-header">
                <h2>Notes</h2>
                <p>Your quick notes and reminders</p>
            </div>
            <div class="notes-grid">
                <div class="note-item">
                    <div class="note-title">Meeting Notes</div>
                    <div class="note-content">Discuss project timeline and resource allocation...</div>
                    <div class="note-date">June 22</div>
                </div>
                <div class="note-item">
                    <div class="note-title">Shopping List</div>
                    <div class="note-content">Milk, eggs, bread, vegetables, fruits...</div>
                    <div class="note-date">June 20</div>
                </div>
                <div class="note-item">
                    <div class="note-title">Ideas</div>
                    <div class="note-content">New app concept for productivity tracking...</div>
                    <div class="note-date">June 18</div>
                </div>
                <div class="note-item">
                    <div class="note-title">Tasks</div>
                    <div class="note-content">Finish report, call client, update website...</div>
                    <div class="note-date">June 15</div>
                </div>
            </div>
        `
    }
};

// Function to switch between different areas
function switchArea(areaId) {
    // Update sidebar selection
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Find the clicked sidebar item and add selected class
    const sidebarItem = document.querySelector(`.sidebar-item[data-area="${areaId}"]`);
    if (sidebarItem) {
        sidebarItem.classList.add('selected');
    }
    
    // Update address bar
    const addressBar = document.querySelector('.location-text');
    const areaData = areaComponents[areaId];
    if (addressBar && areaData) {
        addressBar.textContent = areaData.title;
    }
    
    // Update main content area
    const mainArea = document.querySelector('.main-area');
    
    // Special case for trash which has its own content
    if (areaId === 'trash') {
        // Show the existing trash content
        document.getElementById('trash-content').style.display = 'flex';
        document.getElementById('dynamic-content').style.display = 'none';
        return;
    }
    
    // For other areas, update the dynamic content
    document.getElementById('trash-content').style.display = 'none';
    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.style.display = 'block';
    
    if (areaData && areaData.content) {
        dynamicContent.innerHTML = areaData.content;
    } else {
        dynamicContent.innerHTML = `<div class="empty-message">No content available for ${areaId}</div>`;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add data-area attributes to sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const areas = ['home', 'downloads', 'code', 'trash', 'movie', 'notes'];
    
    sidebarItems.forEach((item, index) => {
        if (index < areas.length) {
            item.setAttribute('data-area', areas[index]);
            
            // Add click event listener
            item.addEventListener('click', () => {
                switchArea(areas[index]);
            });
        }
    });
    
    // Initialize with trash view
    switchArea('trash');
}); 