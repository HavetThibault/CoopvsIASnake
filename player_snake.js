import {equals, copy} from './point.js';
import {Snake} from './snake.js'

class PlayerSnake extends Snake{
    constructor(initialPos, move, bodyPartsNbr, nextMovePeriod){
        super(initialPos, move, bodyPartsNbr, nextMovePeriod)
        this._headPos = initialPos;
        this._bodyPartsNbr = bodyPartsNbr;
        this._bodyParts = [];
        this._bodyParts.push(initialPos);
        this._malus = []
        this._movePeriod = nextMovePeriod;
        this._processedMoveDirection = true;
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
}

export {PlayerSnake};