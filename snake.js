import {equals} from './point.js';

class Snake {
    constructor(initialPos, moveDirection, bodyPartsNbr, nextMovePeriod){
        this._headPos = initialPos;
        this._moveDirection = moveDirection;
        this._bodyPartsNbr = bodyPartsNbr;
        this._bodyParts = [];
        this._bodyParts.push(initialPos);
        this._malus = []
        this._nextMovePeriod = nextMovePeriod;
    }

    get headPos(){
        return this._headPos;
    }

    get moveDirection(){
        return this._moveDirection;
    }

    get nextMovePeriod(){
        return this._nextMovePeriod;
    }

    get bodyParts(){
        return this._bodyParts;
    }
    
    reset(initialPos, moveDirection, bodyPartsNbr, nextMovePeriod){
        this._headPos = initialPos;
        this._moveDirection = moveDirection;
        this._bodyPartsNbr = bodyPartsNbr;
        this._bodyParts = [];
        this._bodyParts.push(initialPos);
        this._malus = []
        this._nextMovePeriod = nextMovePeriod;
    }

    get bodyPartsNbr(){
        return this._bodyPartsNbr;
    }

    nextMove(nextHeadPos){
        this._headPos = nextHeadPos;
        this._bodyParts.unshift(nextHeadPos);
        if(this._bodyParts.length == this._bodyPartsNbr)
            this._bodyParts.pop();
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
            if (this._malus[i].tickDuration === 0) {
                this._malus.splice(i, 1);
            }
        }
    }

    getMoveDirection(){
        let moveDirection = this._moveDirection;
        this._malus.forEach((malus) => {
            moveDirection = malus.getMoveDirection(moveDirection);
        })
        return moveDirection;
    }
}

export {Snake};