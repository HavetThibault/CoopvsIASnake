import {equals, copy} from './point.js';

class Snake {
    constructor(initialPos, move, bodyPartsNbr, nextMovePeriod){
        this._headPos = initialPos;
        this._move = move;
        this._bodyPartsNbr = bodyPartsNbr;
        this._bodyParts = [];
        this._bodyParts.push(initialPos);
        this._malus = []
        this._nextMovePeriod = nextMovePeriod;
        this._processedMoveDirection = true;
    }
    
    get move(){
        return this._move;
    }

    get headPos(){
        return this._headPos;
    }

    get nextMovePeriod(){
        return this._nextMovePeriod;
    }

    get bodyParts(){
        return this._bodyParts;
    }

    get malus(){
        return this._malus;
    }

    clearMalus(){
        this._malus = []
    }

    setMove(move){
        if(this._processedMoveDirection){
            this._malus.forEach(malus => {
                move = malus.getMoveDirection(this, move);
            });
            if(!(Math.sign(move.x) == -Math.sign(this._move.x) && Math.sign(move.y) == -Math.sign(this._move.y))){
                this._move = copy(move);
                this._processedMoveDirection = false;
            }
        }
    }
    
    reset(initialPos, moveDirection, bodyPartsNbr, speed){
        this._headPos = initialPos;
        this._move = moveDirection;
        this._bodyPartsNbr = bodyPartsNbr;
        this._bodyParts = [];
        this._bodyParts.push(initialPos);
        this._malus = []
        this._nextMovePeriod = speed;
    }

    get bodyPartsNbr(){
        return this._bodyPartsNbr;
    }

    nextMove(nextHeadPos){
        this._headPos = nextHeadPos;
        this._bodyParts.unshift(nextHeadPos);
        if(this._bodyParts.length == this._bodyPartsNbr)
            this._bodyParts.pop();
        this._processedMoveDirection = true;
    }

    isBittingItself(){
        for(let i = this._bodyPartsNbr; i >= 1; i--){
            if(equals(this._bodyParts[i],this._headPos))
                return true;
        }
        return false;
    }

    isColliding(pos){
        let result = this._bodyParts.find(bodyPart => equals(bodyPart, pos));
        return result != null;
    }

    areSnakeColliding(snake){
        if(this.isColliding(snake.headPos))
            return true;
        if(snake.isColliding(this.headPos))
            return true;
        return false;
    }

    removeExpiredMalus(){
        for (let i = this._malus.length - 1; i >= 0; i--) {
            if (this._malus[i].tickDuration == 0) {
                this._malus.splice(i, 1);
            }
        }
    }
}

export {Snake};