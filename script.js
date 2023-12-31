let canvas = document.querySelector(".canvas");
let createBtn = document.getElementById("create");
let resetBtn = document.getElementById("reset");
let colorPicker = document.getElementById("picker");
let rainbowModeBtn = document.getElementById("rainbow-mode");
let opacityBtn = document.getElementById("opacity");
let currentColour;
let baseColour = "#3e4c75";
let userPickedColour;
let rainbowModeOn = false;
let userInput = 16;
let cells;

function drawCanvas(cells) {
    cells = cells || userInput;

    let cellWidth = 100 / cells; 
    let cellHeight = 100 / cells; 

    document.documentElement.style.setProperty("--columns", cells);

    for (let i = 0; i < cells * cells; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.style.width = `${cellWidth}%`;
        newDiv.style.height = `${cellHeight}%`;
        newDiv.addEventListener('mouseover', setColour);
        canvas.appendChild(newDiv);
    }
}

function takeUserInput() {
    userInput = document.getElementById("number").value;

    if (!userInput || userInput < 2 || userInput > 100 || isNaN(userInput) || userInput % 1 !== 0) {
        alert("Please enter a positive, whole numerical value between 2 and 100.");
    } else {
        lockedCells = {};
        updateWithUserInput(userInput);
    }
}

function updateWithUserInput(userInput){
        event.preventDefault();
        canvas.innerHTML = "";
        currentColour = baseColour;
        drawCanvas(userInput); // Update the canvas with the new user input value
}

function setColour(event) {
    const cell = event.target;
    if (rainbowModeOn) {
        const randomColor = getRandomRGBA();
        cell.style.background = randomColor;
    } else if (userPickedColour) {
        cell.style.background = userPickedColour;
    } else {
        cell.style.background = baseColour;
    }
}

function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b}, 1)`;    
}

function watchColorPicker() {
    rainbowModeOn = false;
    increaseOpacitymodeOn = false;
    userPickedColour = colorPicker.value;
}

function resetCanvas() {
    rainbowModeOn = false;
    increaseOpacitymodeOn = false;
    canvas.innerHTML = "";
    drawCanvas(16); 
    colorPicker.value = baseColour;
    currentColour = baseColour;
}

createBtn.addEventListener("click", takeUserInput);
colorPicker.addEventListener("change", watchColorPicker);
rainbowModeBtn.addEventListener("click", () => rainbowModeOn = true);
resetBtn.addEventListener("click", resetCanvas);

drawCanvas();