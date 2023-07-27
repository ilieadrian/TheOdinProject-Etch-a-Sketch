let canvas = document.querySelector(".canvas");
let cells;
let color = "rgba(62, 76, 117)";

function drawCanvas(cells) {
    let cellWidth = 100 / cells; 
    let cellHeight = 100 / cells; 

    document.documentElement.style.setProperty("--columns", cells);

    for (let i = 0; i < cells * cells; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.style.width = `${cellWidth}%`;   
        newDiv.style.height = `${cellHeight}%`;
        newDiv.addEventListener('mouseover', setColour); //Addeing event listener for every cell too start setColour function
        canvas.appendChild(newDiv);
    }
}

function setColour(event) {
    event.target.style.background = color;
}

drawCanvas(16);