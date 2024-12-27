const grid = document.getElementById('pixelGrid');
const gridContainer = document.getElementById('gridContainer');
const rows = 120;
const cols = 120;
let currentColor = 'black';
let isDrawing = false;
let zoomScale = 1;

// Create the grid
function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < rows * cols; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', () => isDrawing = true);
        pixel.addEventListener('mouseup', () => isDrawing = false);
        pixel.addEventListener('mouseover', (e) => {
            if (isDrawing) e.target.style.backgroundColor = currentColor;
        });
        pixel.addEventListener('click', (e) => {
            e.target.style.backgroundColor = currentColor;
        });
        grid.appendChild(pixel);
    }
}

// Change the color
function changeColor(color) {
    currentColor = color;
}

// Clear the grid
function clearGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => pixel.style.backgroundColor = '#fff');
}

// Download the art as an image
function downloadImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pixels = document.querySelectorAll('.pixel');

    // Set canvas size based on the grid dimensions
    canvas.width = cols * 40;
    canvas.height = rows * 40;

    // Draw each pixel on the canvas
    pixels.forEach((pixel, index) => {
        const x = (index % cols) * 40;
        const y = Math.floor(index / cols) * 40;
        ctx.fillStyle = pixel.style.backgroundColor || '#fff';
        ctx.fillRect(x, y, 40, 40);
    });

    // Trigger download
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Zoom functionality
gridContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomAmount = 0.1;
    zoomScale += event.deltaY < 0 ? zoomAmount : -zoomAmount;
    zoomScale = Math.min(Math.max(zoomScale, 0.5), 3); // Limit zoom between 0.5x and 3x
    grid.style.transform = `scale(${zoomScale})`;
});

// Initialize the grid
createGrid();

// Detect mouse state globally for drawing
document.body.addEventListener('mousedown', () => isDrawing = true);
document.body.addEventListener('mouseup', () => isDrawing = false);
