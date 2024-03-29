import {PlayerSnake} from './player_snake.js'; 
import {Point, equals, add, copy} from './point.js'; 
import {getRandomInt} from './helper.js';
import {InvertCtrlMalus} from './invert_ctrl_malus.js'


const initialBodyPartsNbr = 2;
const invertCtrlMalusDuration = 200;

function resetSnake(snake, snakePos, move, speed){
    snake.clearMalus();
    snake.reset(
        snakePos, 
        copy(move), 
        initialBodyPartsNbr, 
        speed);
}

function getSnakeScore(snake) {
    return snake.bodyParts.length;
}


class Game{
    constructor(xCellsNbr, yCellsNbr, levels, gameAnimator) {
        this._snake1 = new PlayerSnake(
            levels[0].snake1Pos,
            copy(levels[0].snake1Move), 
            initialBodyPartsNbr, 
            levels[0].snake1Speed);
        this._snake2 = new PlayerSnake(
            levels[0].snake2Pos,
            copy(levels[0].snake2Move), 
            initialBodyPartsNbr, 
            levels[0].snake2Speed);
        this._gameAnimator = gameAnimator;
        this._xCellsNbr = xCellsNbr;
        this._yCellsNbr = yCellsNbr;
        this._cellsNbr = xCellsNbr * yCellsNbr;
        this._malus = [];
        this._tick = 0;
        this._opponents = [];
        this._level_cnt = 0;
        this._levels = levels;
        this._sleepingOpponents = levels[0].generateOpponents();
        this.resetFoodPos();
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

    get currentLvl() {
        return this._levels[this._level_cnt];
    }

    restartLevel(){
        this._malus = [];
        this._tick = 0;
        this._opponents = [];
        let currentLvl = this.currentLvl;
        this._sleepingOpponents = currentLvl.generateOpponents();
        resetSnake(this._snake1, currentLvl.snake1Pos, currentLvl.snake1Move, currentLvl.snake1Speed);
        resetSnake(this._snake2, currentLvl.snake2Pos, currentLvl.snake2Move, currentLvl.snake2Speed);
        this.updateSnake1Score();
        this.updateSnake2Score();
        this.resetFoodPos();
    }

    updateSnake1Score() {
        this._gameAnimator.displaySnakeScore1(getSnakeScore(this._snake1), this.currentLvl.snake1TargetScore);
    }

    updateSnake2Score() {
        this._gameAnimator.displaySnakeScore2(getSnakeScore(this._snake2), this.currentLvl.snake2TargetScore);
    }

    moveSnake(snake){
        if(snake.nextMovePeriod != 1 && this._tick % snake.nextMovePeriod != 0)
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
        if (this._snake1.isColliding(this._snake2.headPos))
            return true;
        if(this._snake2.isColliding(this._snake1.headPos))
            return true;
        for(let i = this._opponents.length - 1; i >= 0; i--){
            if(this._snake1.areSnakeColliding(this._opponents[i]))
                return true;
            if(this._snake2.areSnakeColliding(this._opponents[i]))
                return true;
        }
        return false;
    }

    wakeSleepingOpponents(){
        for(let i = this._sleepingOpponents.length - 1; i >= 0; i--){
            let opponent = this._sleepingOpponents[i];
            if(opponent.birthTick == this._tick){
                this._opponents.push(opponent)
                this._sleepingOpponents.pop(opponent)
            }
        } 
    }

    playTick(){
        this.wakeSleepingOpponents()
        this.moveSnake(this._snake1);
        this.moveSnake(this._snake2);
        this._opponents.forEach(opponent => {
            this.moveSnake(opponent);
        });

        if(equals(this._snake1.headPos, this._food1Pos)){
            this._snake1._bodyPartsNbr++;
            this.updateSnake1Score();
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
            this.updateSnake2Score();
            this._food2Pos = this.getFoodPos(this._food1Pos)
        }
        else if (equals(this._snake1.headPos, this._food2Pos)){
            let malus = new InvertCtrlMalus(invertCtrlMalusDuration);
            this._malus.push(malus);
            this._snake2.malus.push(malus);
            this._food2Pos = this.getFoodPos(this._food1Pos)
        }

        if(this.collisionDetected())
            this.loosing();
        else if (this.isCurrentLevelCompleted())
            this.winning();
        else {
            this.malusNextTick();
            this._snake1.removeExpiredMalus();
            this._snake2.removeExpiredMalus();
            this._tick++;
        }
    }

    isCurrentLevelCompleted() {
        let currentLvl = this.currentLvl
        return getSnakeScore(this._snake1) >= currentLvl.snake1TargetScore && 
            getSnakeScore(this._snake2) >= currentLvl.snake2TargetScore;
    }

    malusNextTick() {
        for (let i = this._malus.length - 1; i >= 0; i--) {
            this._malus[i].tickDuration--;
            if (this._malus[i].tickDuration == 0) {
                this._malus.splice(i, 1);
            }
        }
    }

    loosing() {
        this._gameAnimator.loosingAnimation();
        this.restartLevel();
    }

    winning() {
        this._level_cnt++;
        this._gameAnimator.winningAnimation();
        if (this._level_cnt == this._levels.length) {
            this._gameAnimator.showGift();
            this._level_cnt--;
        }
        this.restartLevel();
    }

    resetFoodPos(){
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

export {Game, getSnakeScore};