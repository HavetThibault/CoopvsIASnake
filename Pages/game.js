import {Snake} from 'snake.js'; 
import {Point, equals} from 'point.js'; 
import {getRandomInt} from 'helper.js';

const snakeMoveDirection = new Point(1, 0)

class Game{
    constructor(xCellsNbr, yCellsNbr, opponentsNbr){
        this.snake1 = new Snake();
        this.snake2 = snake2;
        this.opponentsNbr = opponentsNbr;
        this.xCellsNbr = xCellsNbr;
        this.yCellsNbr = yCellsNbr;
        this.cellsNbr = xCellsNbr * yCellsNbr;
        this.opponents = [];
        this.food1Pos = null;
        this.malus = []
        this.food2Pos = null;
    }

    playTick(){
        if(equals(this.snake1.headPos, this.food1Pos)){
            this.snake1.bodyPartsNbr++;
            this.food1Pos = this.getFoodPos(this.food2Pos)
        }
        if(equals(this.snake2.headPos, this.food2Pos)){
            this.snake1.bodyPartsNbr++;
            this.food1Pos = this.getFoodPos(this.food1Pos)
        }
        if(this.snake1.isBittingItself() || this.snake2.isBittingItself() || 
            this.snake2.isColliding(this.snake1.headPos) || this.snake1.isColliding(this.snake2.headPos)){
            this.loosing();
        }
        this.malusNextTick();
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
        this.opponentsPositions.array.forEach(opponentPos => {
            this.addOpponent(opponentPos);
        });
        this.initFoodPos();
    }

    addOpponent(position){
        this.opponents.push(new Snake(position, snakeMoveDirection));
    }

    initFoodPos(){
        this.food1Pos = this.getFoodPos(null);
        this.food2Pos = this.getFoodPos(this.food1Pos);
    }

    getFoodPos(otherFoodPos){
        let foodIndex = this.getRandomFoodIndex(otherFoodPos != null);
        let point = new Point(0, 0);
        for(y = 0; y < this.yCellsNbr; y++){
            point.y = y;
            for(x = 0; x < this.xCellsNbr; x++){
                point.x = x;
                if(!this.snake1.isColliding(point) && !this.snake2.isColliding(point) && !equals(point, otherFoodPos)){
                    if(foodIndex == 0)
                        return new Point(point.x, point.y);
                    foodIndex--;
                }
            }
        }
    }

    getRandomFoodIndex(isOtherFoodPresent){
        let occupiedCellNbr = 0;
        occupiedCellNbr += this.snake1.bodyParts.length;
        occupiedCellNbr += this.snake2.bodyParts.length;
        this.opponents.array.forEach(opponent => {
            occupiedCellNbr += opponent.bodyParts.length;
        });
        if(isOtherFoodPresent){
            occupiedCellNbr++;
        }
        return getRandomInt(0, this.cellsNbr - occupiedCellNbr);
    }
}

export {Game};