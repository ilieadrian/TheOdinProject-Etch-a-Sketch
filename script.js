let canvas = document.querySelector(".canvas");
let squares = 16;


function drawCanvas() {
    let cellWidth = 100 / squares; 
    let cellHeight = 100 / squares; 

    // Set the --columns CSS variable to the value of squares
    document.documentElement.style.setProperty("--columns", squares);

    for (let i = 0; i < squares * squares; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.style.width = `${cellWidth}%`;   
        newDiv.style.height = `${cellHeight}%`;
        canvas.appendChild(newDiv);
    }
}

drawCanvas()