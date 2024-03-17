import {Snake} from "snake.js"; 

const snake1InitialX = 10;
const snake1InitialY = 10;

class Game{
    constructor(snake1, snake2, cellWidth, cellHeight, gridWidth, gridHeight, opponentsNbr){
        this.snake1 = snake1;
        this.snake2 = snake2;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.opponentsNbr = opponentsNbr;
        this.xCellsNbr = gridWidth / cellWidth;
        this.yCellsNbr = gridHeight / cellHeight;
        this.cellsNbr = xCellsNbr * yCellsNbr;
        this.opponents = []
    }

    initGame(){
        for(let i = 0; i < this.opponentsNbr; i++){
            this.addOpponent();
        }
        this.resetFoodPos();
    }

    addOpponent(){
        this.opponents.push(new Snake())
    }

    resetFoodPos(){
        let occupiedCellNbr = 0;
        occupiedCellNbr += this.snake1.bodyParts.length;
        occupiedCellNbr += this.snake2.bodyParts.length;
        for(let i = 0; i < this.opponentsNbr; i++){
            occupiedCellNbr += 
        }
    }
}

export {Game};