// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

// Elements
const emotionSelect = document.getElementById('emotion');
const brushSizeInput = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const brushColorInput = document.getElementById('brushColor');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const emotionDisplay = document.getElementById('emotionDisplay');

// Drawing state
let isDrawing = false;
let brushSize = 5;
let brushColor = '#000000';

// Emotion emojis mapping
const emotionEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    cool: '😎',
    love: '😍',
    confused: '😕',
    tired: '😴'
};

// Update brush size
brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
    brushSizeValue.textContent = brushSize;
});

// Update brush color
brushColorInput.addEventListener('input', (e) => {
    brushColor = e.target.value;
});

// Update emotion display
emotionSelect.addEventListener('change', (e) => {
    const emotion = e.target.value;
    emotionDisplay.textContent = emotionEmojis[emotion];
});

// Drawing events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// Clear canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download emoji
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    const emotion = emotionSelect.value;
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `emotion-emoji-${emotion}-${timestamp}.png`;
    link.click();
});

// Initialize
emotionDisplay.textContent = emotionEmojis['happy'];