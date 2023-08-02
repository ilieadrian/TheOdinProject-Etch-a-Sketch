let canvas = document.querySelector(".canvas");
let createBtn = document.getElementById("create");
let clearBtn = document.getElementById("clear");
let color = document.getElementById("picker");
let userInput;
let cells;


function drawCanvas(cells) {
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

function setColour(event, pickedColour) {
    event.target.style.background = color.value;

    if(pickedColour) {
        event.target.style.background = pickedColour;
    }
}

function takeUserInput() {
    event.preventDefault();
    userInput = document.getElementById("number").value;  

    if (!userInput || userInput < 2 || userInput > 100 || isNaN(userInput) || userInput % 1 != 0)  {
        alert("Please enter a positive, whole numerical value between 2 and 100.");
        document.getElementById("number").value = "";
    } else {
        //Clears the previous canvas and draw a new one according to user input
        resetCanvas()
    }
}

function resetCanvas() {
    canvas.innerHTML = ""; 
    drawCanvas(16);
}

function watchColorPicker(event) {
    return pickedColour;
}

createBtn.addEventListener("click", takeUserInput);
color.addEventListener("input", watchColorPicker, false);

clearBtn.addEventListener("click", resetCanvas);

drawCanvas(16);