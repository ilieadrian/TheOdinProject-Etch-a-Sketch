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
let increaseOpacitymodeOn = false;
let userInput = 16;
let cells;
let lockedCells = {};


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
        newDiv.setAttribute('data-cell-index', i);
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

// function setColour(event) {
//     if (increaseOpacitymodeOn) {
//         increaseOpacitymode();
//     }

//     const cellIndex = event.target.getAttribute('data-cell-index');
//     const cell = event.target;

//     if (rainbowModeOn) {
//         if (!lockedCells[cellIndex]) {
//             const randomColor = getRandomRGBA();
//             cell.style.background = randomColor;
//         }
//     } else if (userPickedColour) {
//         if (!lockedCells[cellIndex]) {
//             cell.style.background = userPickedColour;
//         }
//     } else if (!lockedCells[cellIndex]) {
//         cell.style.background = baseColour;
//     }
// }

function setColour(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');
    const cell = event.target;

    if (increaseOpacitymodeOn) {
        cell.style.backgroundColor = currentColour;
        cell.style.opacity = 0.1; // Set initial opacity
        lockedCells[cellIndex] = true;
        return; // Exit the function to prevent further color changes
    }

    if (rainbowModeOn) {
        if (!lockedCells[cellIndex]) {
            const randomColor = getRandomRGBA();
            cell.style.background = randomColor;
        }
    } else if (userPickedColour) {
        if (!lockedCells[cellIndex]) {
            cell.style.background = userPickedColour;
        }
    } else if (!lockedCells[cellIndex]) {
        cell.style.background = baseColour;
    }
}

// function increaseOpacitymode() {
//     console.log("Hello from opacity mode");
//     increaseOpacitymodeOn = true;

//     canvas.addEventListener("mouseover", function(event) {
//         if (increaseOpacitymodeOn) {
//             const cell = event.target;
//             const cellIndex = cell.getAttribute('data-cell-index');

//             if (!lockedCells[cellIndex]) {
//                 if (!cell.style.backgroundColor || cell.style.backgroundColor === currentColour) {
//                     cell.style.backgroundColor = currentColour;
//                     cell.dataset.opacityValue = 0.1; // Set initial opacity
//                 } else {
//                     let opacityValue = parseFloat(cell.dataset.opacityValue);
//                     if (opacityValue <= 1) {
//                         opacityValue += 0.1;
//                         cell.dataset.opacityValue = opacityValue;
//                         cell.style.opacity = opacityValue;
//                     }
//                 }
//             }
//         }
//     });
// }

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

function toggleLock(cellIndex) {
    if (lockedCells[cellIndex]) {
        lockedCells[cellIndex] = null; // Unlock the cell
    } else {
        lockedCells[cellIndex] = currentColour; // Lock the cell with the current color
    }
}

function resetCanvas() {
    lockedCells = {};
    rainbowModeOn = false;
    increaseOpacitymodeOn = false;
    canvas.innerHTML = "";
    drawCanvas(16); 
    colorPicker.value = baseColour;
    currentColour = baseColour;
}

createBtn.addEventListener("click", takeUserInput);
// opacityBtn.addEventListener("click", () => increaseOpacitymodeOn = true);
colorPicker.addEventListener("change", watchColorPicker);
rainbowModeBtn.addEventListener("click", () => rainbowModeOn = true);
resetBtn.addEventListener("click", resetCanvas);
canvas.addEventListener('click', function(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');
    if (cellIndex !== null) {
        toggleLock(cellIndex);
    }
});

drawCanvas();




// 

// Old version

// 

// let canvas = document.querySelector(".canvas");
// let createBtn = document.getElementById("create");
// let resetBtn = document.getElementById("reset");
// let colorPicker = document.getElementById("picker");
// let rainbowModeBtn = document.getElementById("rainbow-mode");
// let opacityBtn = document.getElementById("opacity");
// let currentColour;
// let baseColour = "#3e4c75";
// let userPickedColour;
// let rainbowModeOn = false;
// let increaseOpacitymodeOn = false;
// let userInput = 16;
// let cells;


// function drawCanvas(cells) {
//     cells = cells || userInput;

//     let cellWidth = 100 / cells; 
//     let cellHeight = 100 / cells; 

//     document.documentElement.style.setProperty("--columns", cells);

//     for (let i = 0; i < cells * cells; i++) {
//         const newDiv = document.createElement("div");
//         newDiv.classList.add("cell");
//         newDiv.style.width = `${cellWidth}%`;
//         newDiv.style.height = `${cellHeight}%`;
//         newDiv.addEventListener('mouseover', setColour); // Updated this line
//         canvas.appendChild(newDiv);
//     }
// }

// function takeUserInput() {
//     userInput = document.getElementById("number").value;

//     if (!userInput || userInput < 2 || userInput > 100 || isNaN(userInput) || userInput % 1 !== 0) {
//         alert("Please enter a positive, whole numerical value between 2 and 100.");
//     } else {
//         updateWithUserInput(userInput);
//     }
// }

// function updateWithUserInput(userInput){
//         event.preventDefault();
//         canvas.innerHTML = "";
//         currentColour = baseColour;
//         drawCanvas(userInput); // Update the canvas with the new user input value
// }

// // 

// function setColour(event) {
//     // Reset the opacity value when a new cell is hovered
//     if (increaseOpacitymodeOn) {
//         increaseOpacitymode()
//     }

//     opacityValue = 0.1;
    
//     const cell = event.target;
//     if (rainbowModeOn) {
//         const randomColor = getRandomRGBA();
//         cell.style.background = randomColor;
//         // increaseOpacitymodeOn = false;
//     } else if (userPickedColour) {
//         cell.style.background = userPickedColour;
//     } else {
//         cell.style.background = baseColour;
//     }
// }

// function increaseOpacitymode() {
//     console.log("Hello from opacity mode");
//     canvas.addEventListener("mouseover", function(event) {
//                 const cell = event.target;

//                 opacityStartColour = cell.style.backgroundColor;

            
//                 console.log(opacityStartColour)
        
//     });
// }

// // 

// function getRandomRGBA() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);

//     return `rgba(${r},${g},${b}, 1)`;    
// }

// function watchColorPicker() {
//     rainbowModeOn = false;
//     increaseOpacitymodeOn = false;
//     userPickedColour = colorPicker.value;
// }

// function resetCanvas() {
//     canvas.innerHTML = "";
//     drawCanvas(16); 
//     colorPicker.value = baseColour;
//     currentColour = baseColour;
//     rainbowModeOn = false;
//     increaseOpacitymodeOn = false;
// }

// createBtn.addEventListener("click", takeUserInput);
// opacityBtn.addEventListener("click", () => increaseOpacitymodeOn = true);
// colorPicker.addEventListener("change", watchColorPicker);
// rainbowModeBtn.addEventListener("click", () => rainbowModeOn = true);
// resetBtn.addEventListener("click", resetCanvas);

// drawCanvas();