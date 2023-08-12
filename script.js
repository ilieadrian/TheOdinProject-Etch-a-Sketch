let canvas = document.querySelector(".canvas");
let createBtn = document.getElementById("create");
let resetBtn = document.getElementById("reset");
let colorPicker = document.getElementById("picker");
let rainbowModeBtn = document.getElementById("rainbow-mode");
let opacityBtn = document.getElementById("opacity");
let currentColour;
let baseColour = "#3e4c75";
let opacityValue = 0.1;
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
        newDiv.addEventListener('mouseover', setColour); // Updated this line
        canvas.appendChild(newDiv);
    }
}

function takeUserInput() {
    userInput = document.getElementById("number").value;

    if (!userInput || userInput < 2 || userInput > 100 || isNaN(userInput) || userInput % 1 !== 0) {
        alert("Please enter a positive, whole numerical value between 2 and 100.");
    } else {
        updateWithUserInput(userInput);
    }
}

function updateWithUserInput(userInput){
        event.preventDefault();
        canvas.innerHTML = "";
        currentColour = baseColour;
        drawCanvas(userInput); // Update the canvas with the new user input value
}

function increasOpacitymode(event) {
    canvas.addEventListener("mouseover", function(event) {
        const cell = event.target;
        if (cell.classList.contains("cell")) {
            cell.style.backgroundColor = currentColour; // Set the current color
            
            // Increase the opacity
            cell.style.opacity = opacityValue.toString();
            
            // Increment the opacity value for the next hover
            opacityValue += 0.1;
            
            // Reset the opacity value when it goes beyond 1
            if (opacityValue > 1) {
                opacityValue = 0.1;
            }
        }
    });
}

function setColour(event) {
    // Reset the opacity value when a new cell is hovered
    opacityValue = 0.1;
    
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

// function setColour(event) {
//     const cell = event.target;

//     if (rainbowModeOn) {
//         const randomColor = getRandomRGBA();
//         cell.style.background = randomColor;
//     } else if (userPickedColour) {
//         cell.style.background = userPickedColour;
//     } else {
//         cell.style.background = baseColour;
//     }
// }

function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b}, 1)`;    
}

function watchColorPicker() {
    rainbowModeOn = false;
    userPickedColour = colorPicker.value;
}

function resetCanvas() {
    canvas.innerHTML = "";
    drawCanvas(16); 
    colorPicker.value = baseColour;
    currentColour = baseColour;
    rainbowModeOn = false;
}

createBtn.addEventListener("click", takeUserInput);
opacityBtn.addEventListener("click", increasOpacitymode)
colorPicker.addEventListener("change", watchColorPicker);
rainbowModeBtn.addEventListener("click", () => rainbowModeOn = true);
resetBtn.addEventListener("click", resetCanvas);

drawCanvas();