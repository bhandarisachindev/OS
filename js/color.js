export const colourPicker =() => {
const pickColorBtn = document.getElementById('pick-color');
const colorGrid = document.getElementById('color-grid');
const instructions = document.querySelector('.instructions');
const toggleBtn = document.getElementById('toggle-picker');
const pickerContainer = document.getElementById('picker-container');




let state = {
pickedColors: [],
isPickingActive: false,
isFirstVisit: !localStorage.getItem('hasVisited'),
html2canvasLoaded: false
};

if (state.isFirstVisit) {
localStorage.setItem('hasVisited', 'true');
localStorage.removeItem('pickedColors');
} else {
try {
const savedColors = localStorage.getItem('pickedColors');
if (savedColors) {
state.pickedColors = JSON.parse(savedColors);
}
} catch (err) {
console.error('Error loading saved colors:', err);
}
}

const rgbToHex = (r, g, b) => {
r = Math.min(255, Math.max(0, Math.round(r)));
g = Math.min(255, Math.max(0, Math.round(g)));
b = Math.min(255, Math.max(0, Math.round(b)));
return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
};

function togglePickerVisibility(show) {
if (show === undefined) {
pickerContainer.classList.toggle('visible');
} else {
pickerContainer.classList[show ? 'add' : 'remove']('visible');
}
}

function renderColorGrid() {
colorGrid.innerHTML = '';

if (state.pickedColors.length === 0) {
const message = document.createElement('div');
message.className = 'no-colors-message';
message.textContent = 'No colors picked yet. Click the "Pick Color" button above to activate the color picker.';
colorGrid.appendChild(message);
return;
}

state.pickedColors.forEach((color, index) => {
const swatch = document.createElement('div');
swatch.className = 'color-swatch';
swatch.dataset.index = index;

const colorBox = document.createElement('div');
colorBox.className = 'color-box';
colorBox.style.backgroundColor = color.hex;

const colorCode = document.createElement('div');
colorCode.className = 'color-code';
colorCode.textContent = color.hex;

const deleteBtn = document.createElement('button');
deleteBtn.className = 'delete-btn';
deleteBtn.innerHTML = '&times;';
deleteBtn.title = 'Delete color';
deleteBtn.setAttribute('aria-label', 'Delete color');

deleteBtn.addEventListener('click', (e) => {
e.stopPropagation();
state.pickedColors.splice(index, 1);
localStorage.setItem('pickedColors', JSON.stringify(state.pickedColors));
renderColorGrid();
instructions.textContent = `Deleted color: ${color.hex}`;
setTimeout(() => {
    instructions.textContent = 'Click the button to activate the color picker';
}, 1500);
});

swatch.appendChild(colorBox);
swatch.appendChild(colorCode);
swatch.appendChild(deleteBtn);

swatch.addEventListener('click', () => {
navigator.clipboard.writeText(color.hex)
    .then(() => {
        const originalText = colorCode.textContent;
        colorCode.textContent = 'Copied!';
        swatch.classList.add('active');
        
        setTimeout(() => {
            colorCode.textContent = originalText;
            swatch.classList.remove('active');
        }, 1500);
    })
    .catch(err => console.error('Failed to copy color code:', err));
});

colorGrid.appendChild(swatch);
});
}

function toggleColorPicking(enable) {
state.isPickingActive = enable;
document.body.style.cursor = enable ? 'crosshair' : 'default';
pickColorBtn.classList[enable ? 'add' : 'remove']('active');
instructions.textContent = enable 
? 'Click anywhere to pick a color' 
: 'Click the button to activate the color picker';

if (enable) {
activateEyeDropper();
}
}


const isEyeDropperSupported = 'EyeDropper' in window;


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

async function activateEyeDropper() {
if (isEyeDropperSupported) {
try {
const eyeDropper = new EyeDropper();
const result = await eyeDropper.open();

let hex = result.sRGBHex.toUpperCase();

const color = {
    hex: hex,
    rgb: hexToRgb(hex)
};

processPickedColor(color);
return;
} catch (error) {
console.error('EyeDropper API error:', error);
if (error.name !== 'AbortError') {
    instructions.textContent = 'EyeDropper API error. Using fallback method.';
    console.log('EyeDropper API error. Using a custom color-picking method; colors may not be accurate.');
}
}
} else {
console.log("EyeDropper API not available. Using custom method for color picking - colors may not be accurate.");
instructions.textContent = 'Using  custom color-picking method; colors may not be accurate. (EyeDropper API not available)';
}
}

function hexToRgb(hex) {
hex = hex.replace('#', '');

const r = parseInt(hex.substring(0, 2), 16);
const g = parseInt(hex.substring(2, 4), 16);
const b = parseInt(hex.substring(4, 6), 16);

return `rgb(${r}, ${g}, ${b})`;
}


function getElementBgColor(element) {
if (!element) return null;

const style = window.getComputedStyle(element);
const bgColor = style.backgroundColor;

if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
const rgbMatch = bgColor.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
if (rgbMatch) {
const r = parseInt(rgbMatch[1], 10);
const g = parseInt(rgbMatch[2], 10);
const b = parseInt(rgbMatch[3], 10);

return { r, g, b };
}
}
return null;
}


function getColorAtPoint(x, y) {
console.log("Getting color at point:", x, y);

try {

const element = document.elementFromPoint(x, y);
if (!element) {
console.log("No element found at point");
return { hex: "#FF0000", rgb: "rgb(255, 0, 0)" };
}

console.log("Found element:", element.tagName);


const bgColor = getElementBgColor(element);
if (bgColor) {
console.log("Direct background color found:", bgColor);
return {
    hex: rgbToHex(bgColor.r, bgColor.g, bgColor.b),
    rgb: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
};
}

if (element.tagName.toLowerCase() === 'img') {
const imgColor = getImageColor(element, x, y);
if (imgColor) {
    console.log("Image color found:", imgColor);
    return imgColor;
}
}


let parent = element.parentElement;
let depth = 0;
while (parent && depth < 5) {
const parentBg = getElementBgColor(parent);
if (parentBg) {
    console.log("Parent background color found:", parentBg);
    return {
        hex: rgbToHex(parentBg.r, parentBg.g, parentBg.b),
        rgb: `rgb(${parentBg.r}, ${parentBg.g}, ${parentBg.b})`
    };
}
parent = parent.parentElement;
depth++;
}


const bodyColor = getElementBgColor(document.body);
if (bodyColor) {
console.log("Body color found:", bodyColor);
return {
    hex: rgbToHex(bodyColor.r, bodyColor.g, bodyColor.b),
    rgb: `rgb(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b})`
};
}

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
console.log("Using random color:", randomColor);

return {
hex: randomColor,
rgb: hexToRgb(randomColor)
};

} catch (error) {
console.error("Error picking color:", error);
return { hex: "#FF0000", rgb: "rgb(255, 0, 0)" };
}
}


function getImageColor(img, x, y) {
try {

const rect = img.getBoundingClientRect();


const relativeX = x - rect.left;
const relativeY = y - rect.top;


if (relativeX < 0 || relativeY < 0 || relativeX >= rect.width || relativeY >= rect.height) {
return null;
}


const tempCanvas = document.createElement('canvas');
const tempCtx = tempCanvas.getContext('2d');

tempCanvas.width = img.naturalWidth || img.width;
tempCanvas.height = img.naturalHeight || img.height;


tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);


const scaleX = tempCanvas.width / rect.width;
const scaleY = tempCanvas.height / rect.height;

const canvasX = Math.floor(relativeX * scaleX);
const canvasY = Math.floor(relativeY * scaleY);

try {
const pixelData = tempCtx.getImageData(canvasX, canvasY, 1, 1).data;
const r = pixelData[0];
const g = pixelData[1];
const b = pixelData[2];

return {
    hex: rgbToHex(r, g, b),
    rgb: `rgb(${r}, ${g}, ${b})`
};
} catch (e) {
console.error("Error getting pixel data:", e);
return null;
}
} catch (error) {
console.error("Error with image color extraction:", error);
return null;
}
}


async function loadHtml2Canvas() {
return new Promise((resolve) => {
if (typeof html2canvas !== 'undefined') {
state.html2canvasLoaded = true;
resolve(true);
return;
}

const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
script.async = true;

script.onload = () => {
console.log('html2canvas loaded successfully');
state.html2canvasLoaded = true;
resolve(true);
};

script.onerror = () => {
console.error('Failed to load html2canvas');
resolve(false);
};

document.head.appendChild(script);
});
}


loadHtml2Canvas();

toggleBtn.addEventListener('click', (e) => {
e.stopPropagation();
togglePickerVisibility();

if (pickerContainer.classList.contains('visible') && state.pickedColors.length === 0) {
pickerContainer.scrollTop = 0;
}
});

pickColorBtn.addEventListener('click', (e) => {
toggleColorPicking(!state.isPickingActive);
e.stopPropagation();
});


document.addEventListener('click', (e) => {

if (state.isPickingActive && !isEyeDropperSupported) {

const color = getColorAtPoint(e.clientX, e.clientY);
processPickedColor(color);
return; 
}


if (e.target === toggleBtn || toggleBtn.contains(e.target)) {
return;
}


if (!pickerContainer.contains(e.target)) {
togglePickerVisibility(false);
}
});

function processPickedColor(color) {
state.pickedColors.unshift({
...color,
timestamp: new Date().toISOString()
});

if (state.pickedColors.length > 20) {
state.pickedColors = state.pickedColors.slice(0, 20);
}

localStorage.setItem('pickedColors', JSON.stringify(state.pickedColors));
renderColorGrid();

instructions.textContent = `Picked color: ${color.hex}`;
toggleColorPicking(false);
}

if (state.isFirstVisit) {
setTimeout(() => togglePickerVisibility(true), 300);
}

renderColorGrid();
}