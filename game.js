import {Snake} from './snake.js'; 
import {Point, equals, add, copy} from './point.js'; 
import {getRandomInt} from './helper.js';

const snakeMoveDirection = new Point(1, 0)
const initialMovePeriod = 8;
const initialBodyPartsNbr = 5;

class Game{
    constructor(snake1Pos, snake2Pos, xCellsNbr, yCellsNbr, opponentsPositions){
        this.snake1 = new Snake(
            snake1Pos, 
            copy(snakeMoveDirection), 
            initialBodyPartsNbr, 
            initialMovePeriod);
        this.snake2 = new Snake(
            snake2Pos, 
            copy(snakeMoveDirection), 
            initialBodyPartsNbr, 
            initialMovePeriod);
        this.opponentsPositions = opponentsPositions;
        this.opponentsNbr = opponentsPositions.length;
        this.xCellsNbr = xCellsNbr;
        this.yCellsNbr = yCellsNbr;
        this.cellsNbr = xCellsNbr * yCellsNbr;
        this.opponents = [];
        this.food1Pos = null;
        this.food2Pos = null;
        this.malus = [];
        this.tick = 0;
    }

    moveSnake(snake){
        if(this.tick % snake.nextMovePeriod != 0)
            return;
        const nextPos = add(snake.moveDirection, snake.headPos);
        if(nextPos.x < 0)
            nextPos.x = this.xCellsNbr-1;
        else if(nextPos.x >= this.xCellsNbr)
            nextPos.x = 0;
        if(nextPos.y < 0)
            nextPos.y = this.yCellsNbr-1;
        else if(nextPos.y >= this.yCellsNbr)
            nextPos.y = 0;
        snake.nextMove(nextPos);
    }

    playTick(){
        this.moveSnake(this.snake1);
        this.moveSnake(this.snake2);
        this.opponents.forEach(opponent => {
            this.moveSnake(opponent);
        });
        if(equals(this.snake1.headPos, this.food1Pos)){
            this.snake1.bodyPartsNbr++;
            this.food1Pos = this.getFoodPos(this.food2Pos);
        }
        if(equals(this.snake2.headPos, this.food2Pos)){
            this.snake2.bodyPartsNbr++;
            this.food2Pos = this.getFoodPos(this.food1Pos)
        }
        if(this.snake1.isBittingItself() || this.snake2.isBittingItself() || 
            this.snake2.isColliding(this.snake1.headPos) || this.snake1.isColliding(this.snake2.headPos)){
            this.loosing();
        }
        this.malusNextTick();
        this.tick++;
    }

    malusNextTick() {
        for (let i = this.malus.length - 1; i >= 0; i--) {
            this.malus[i].tickDuration--;
            if (this.malus[i].tickDuration === 0) {
                this.malus.splice(i, 1);
            }
        }
    }

    loosing(){

    }

    resetGame(){
        this.opponents = [];
        this.opponentsPositions.forEach(opponentPosition => {
            this.addOpponent(opponentPosition);
        });
        this.initFoodPos();
    }

    addOpponent(position){
        this.opponents.push(new Snake(
            position, 
            copy(snakeMoveDirection), 
            initialBodyPartsNbr, 
            initialMovePeriod));
    }

    initFoodPos(){
        this.food1Pos = this.getFoodPos(null);
        this.food2Pos = this.getFoodPos(this.food1Pos);
    }

    getFoodPos(otherFoodPos){
        let foodIndex = this.getRandomFoodIndex(otherFoodPos != null);
        console.log(foodIndex);
        let point = new Point(0, 0);
        for(let y = 0; y < this.yCellsNbr; y++){
            point.y = y;
            for(let x = 0; x < this.xCellsNbr; x++){
                point.x = x;
                if(!this.snake1.isColliding(point) && !this.snake2.isColliding(point) && !equals(point, otherFoodPos)){
                    if(foodIndex == 0)
                        return point;
                    foodIndex--;
                }
            }
        }
    }

    getRandomFoodIndex(isOtherFoodPresent){
        let occupiedCellNbr = 0;
        occupiedCellNbr += this.snake1.bodyParts.length;
        occupiedCellNbr += this.snake2.bodyParts.length;
        this.opponents.forEach(opponent => {
            occupiedCellNbr += opponent.bodyParts.length;
        });
        if(isOtherFoodPresent){
            occupiedCellNbr++;
        }
        return getRandomInt(0, this.cellsNbr - occupiedCellNbr);
    }
}

export {Game};