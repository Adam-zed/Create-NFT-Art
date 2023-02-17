
  // Get the whiteboard element
const whiteboard = document.getElementById("whiteboard");

// Set the whiteboard to listen for mouse events
whiteboard.addEventListener("mousedown", startDrawing);
whiteboard.addEventListener("mousemove", draw);
whiteboard.addEventListener("mouseup", stopDrawing);

// Set up the canvas context
const context = whiteboard.getContext("2d");

// Set the default drawing settings
let color = "black";
let size = 5;
let eraser = false;

// Set the initial coordinates to null
let x = null;
let y = null;

// Get the toolbar elements
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const colorPicker = document.getElementById("color-picker");
const sizeSlider = document.getElementById("size-slider");
const eraserButton = document.getElementById("eraser-button");

// Add event listeners to the toolbar elements
clearButton.addEventListener("click", clearDrawing);
saveButton.addEventListener("click", saveDrawing);
colorPicker.addEventListener("change", changeColor);
sizeSlider.addEventListener("input", changeSize);
eraserButton.addEventListener("click", toggleEraser);

function startDrawing(event) {
  // Set the initial coordinates to the mouse position
  x = event.clientX - whiteboard.offsetLeft;
  y = event.clientY - whiteboard.offsetTop;
}

function draw(event) {
  if (x !== null && y !== null) {
    // Draw a line from the last coordinates to the new coordinates
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(event.clientX - whiteboard.offsetLeft, event.clientY - whiteboard.offsetTop);
    context.strokeStyle = eraser ? "white" : color;
    context.lineWidth = size;
    context.stroke();

    // Set the new coordinates to the last coordinates
    x = event.clientX - whiteboard.offsetLeft;
    y = event.clientY - whiteboard.offsetTop;
  }
}

function stopDrawing() {
  // Reset the coordinates to null when the mouse button is released
  x = null;
  y = null;
}

function clearDrawing() {
  // Clear the canvas
  context.clearRect(0, 0, whiteboard.width, whiteboard.height);
}

function saveDrawing() {
  // Open the drawing in a new window and prompt the user to save it
  const dataUrl = whiteboard.toDataURL();
  const newWindow = window.open();
  newWindow.document.write(`<img src="${dataUrl}">`);
  newWindow.document.body.style.backgroundColor = "white";
  newWindow.document.title = "Whiteboard Drawing";
}

function changeColor() {
  // Update the color variable when the color picker is changed
  color = colorPicker.value;
}

function changeSize() {
  // Update the size variable when the size slider is changed
  size = sizeSlider.value;
}

function toggleEraser() {
  // Toggle the eraser variable when the eraser button is clicked
  eraser = !eraser;
}