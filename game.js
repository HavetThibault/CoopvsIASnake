import {Snake} from './snake.js'; 
import {Point, equals, add, copy, toString} from './point.js'; 
import {getRandomInt} from './helper.js';
import {InvertCtrlMalus} from './invert_ctrl_malus.js'


const snakeMoveDirection = new Point(1, 0)
const initialMovePeriod = 3;
const initialBodyPartsNbr = 8;
const invertCtrlMalusDuration = 10000;

function getInitialSnake(snakePos){
    return new Snake(
        snakePos,
        copy(snakeMoveDirection), 
        initialBodyPartsNbr, 
        initialMovePeriod);
}


function resetSnake(snake, snakePos){
    snake.reset(
        snakePos, 
        copy(snakeMoveDirection), 
        initialBodyPartsNbr, 
        initialMovePeriod);
}


class Game{
    constructor(snake1Pos, snake2Pos, xCellsNbr, yCellsNbr, opponentsPositions){
        this._snake1Pos = snake1Pos;
        this._snake2Pos = snake2Pos;
        this._snake1 = getInitialSnake(snake1Pos);
        this._snake2 = getInitialSnake(snake2Pos);
        this._opponentsPositions = opponentsPositions;
        this._opponentsNbr = opponentsPositions.length;
        this._xCellsNbr = xCellsNbr;
        this._yCellsNbr = yCellsNbr;
        this._cellsNbr = xCellsNbr * yCellsNbr;
        this._malus = [];
        this._tick = 0;
        this._opponents = [];
        this._opponentsPositions.forEach(opponentPosition => {
            this.addOpponent(opponentPosition);
        });
        this.initFoodPos();
    }

    get snake1(){
        return this._snake1;
    }

    get snake2(){
        return this._snake2;
    }

    get foodPos1(){
        return this._food1Pos;
    }

    get foodPos2(){
        return this._food2Pos;
    }

    get opponents(){
        return this._opponents;
    }

    resetGame(){
        this._malus = [];
        this._tick = 0;
        this._opponents = [];
        this._opponentsPositions.forEach(opponentPosition => {
            this.addOpponent(opponentPosition);
        });
        resetSnake(this._snake1, this._snake1Pos);
        resetSnake(this._snake2, this._snake2Pos);
    }

    moveSnake(snake){
        if(this._tick % snake.nextMovePeriod != 0)
            return;
        let nextPos = add(snake.move, snake.headPos);
        if(nextPos.x < 0)
            nextPos.x = this._xCellsNbr-1;
        else if(nextPos.x >= this._xCellsNbr)
            nextPos.x = 0;
        if(nextPos.y < 0)
            nextPos.y = this._yCellsNbr-1;
        else if(nextPos.y >= this._yCellsNbr)
            nextPos.y = 0;
        snake.nextMove(nextPos);
    }

    collisionDetected(){
        if(this._snake1.isBittingItself())
            return true;
        if(this._snake2.isBittingItself())
            return true;
        if(this._snake2.isColliding(this._snake1.headPos))
            return true;
        if(this._snake1.isColliding(this._snake2.headPos))
            return true;
        for(let i = this._opponentsNbr - 1; i >= 0; i--){
            if(this._snake1.areSnakeColliding(this._opponents[i]))
                return true;
            if(this._snake2.areSnakeColliding(this._opponents[i]))
                return true;
        }
        return false;
    }

    playTick(){
        this.moveSnake(this._snake1);
        this.moveSnake(this._snake2);
        this._opponents.forEach(opponent => {
            this.moveSnake(opponent);
        });
        if(equals(this._snake1.headPos, this._food1Pos)){
            this._snake1._bodyPartsNbr++;
            this._food1Pos = this.getFoodPos(this._food2Pos);
        }
        else if (equals(this._snake2.headPos, this._food1Pos)){
            let malus = new InvertCtrlMalus(invertCtrlMalusDuration);
            this._malus.push(malus);
            this._snake1.malus.push(malus);
            this._food1Pos = this.getFoodPos(this._food2Pos);
        }
        if(equals(this._snake2.headPos, this._food2Pos)){
            this._snake2._bodyPartsNbr++;
            this._food2Pos = this.getFoodPos(this._food1Pos)
        }
        else if (equals(this._snake1.headPos, this._food2Pos)){
            let malus = new InvertCtrlMalus(invertCtrlMalusDuration);
            this._malus.push(malus);
            this._snake2.malus.push(malus);
            this._food2Pos = this.getFoodPos(this._food1Pos)
        }
        if(this.collisionDetected()){
            this.loosing();
        }
        this.malusNextTick();
        this._snake1.removeExpiredMalus();
        this._snake2.removeExpiredMalus();
        this._tick++;
    }

    malusNextTick() {
        for (let i = this._malus.length - 1; i >= 0; i--) {
            this._malus[i].tickDuration--;
            if (this._malus[i].tickDuration == 0) {
                this._malus.splice(i, 1);
            }
        }
    }

    loosing(){
        this.resetGame();
    }

    addOpponent(position){
        this._opponents.push(getInitialSnake(position));
    }

    initFoodPos(){
        this._food1Pos = this.getFoodPos(null);
        this._food2Pos = this.getFoodPos(this._food1Pos);
    }

    getFoodPos(otherFoodPos){
        let foodIndex = this.getRandomFoodIndex(otherFoodPos != null);
        let point = new Point(0, 0);
        for(let y = 0; y < this._yCellsNbr; y++){
            point.y = y;
            for(let x = 0; x < this._xCellsNbr; x++){
                point.x = x;
                if(!this._snake1.isColliding(point) && !this._snake2.isColliding(point) && !equals(point, otherFoodPos)){
                    if(foodIndex == 0)
                        return point;
                    foodIndex--;
                }
            }
        }
        console.log('Shouldn\'t be there !');
    }

    getRandomFoodIndex(isOtherFoodPresent){
        let occupiedCellNbr = 0;
        occupiedCellNbr += this._snake1.bodyParts.length;
        occupiedCellNbr += this._snake2.bodyParts.length;
        this._opponents.forEach(opponent => {
            occupiedCellNbr += opponent.bodyParts.length;
        });
        if(isOtherFoodPresent){
            occupiedCellNbr++;
        }
        return getRandomInt(0, this._cellsNbr - occupiedCellNbr);
    }
}

export {Game};