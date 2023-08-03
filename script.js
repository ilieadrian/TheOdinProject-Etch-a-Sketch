let canvas = document.querySelector(".canvas");
let createBtn = document.getElementById("create");
let resetBtn = document.getElementById("reset");
let colorPicker = document.getElementById("picker");
let currentColour;
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
        newDiv.addEventListener('mouseover', setColour); //Adding event listener for every cell too start setColour function
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
        drawCanvas(userInput); // Update the canvas with the new user input value
}

function watchColorPicker(event) {
    currentColour = colorPicker.value;
    setColour(event, currentColour);
}

function setColour(event, currentColour) {
    currentColour = colorPicker.value;
    event.target.style.background = currentColour;
    
    if(currentColour) {
        event.target.style.background = currentColour;
    }
}

function resetCanvas(event) {
    canvas.innerHTML = "";
    drawCanvas(16); 
    colorPicker.value = "#3e4c75";
    currentColour = "#3e4c75";
    setColour(event, currentColour);
    document.getElementById("reset").style.background = ""; // Reset the background color of the "Clear" button
    //to prevent it to take the set currentColour background colour
}

createBtn.addEventListener("click", takeUserInput);
colorPicker.addEventListener("change", watchColorPicker);

resetBtn.addEventListener("click", resetCanvas);

drawCanvas();