class GameRenderer{
    constructor(canvasContext){
        this.canvasContext = canvasContext;
    }

    renderGameFrame(){
        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        // context.fillRect(cell.x, cell.y, squareSize-1, squareSize-1); 
    }
}

export {GameRenderer};