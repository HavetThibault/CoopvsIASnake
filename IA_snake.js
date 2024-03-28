import {Snake} from './snake.js';

class IASnake extends Snake{
    constructor(initialPos, initialMove, bodyPartsNbr, nextMovePeriod, snakeIA, birthTick){
        super(initialPos, initialMove, bodyPartsNbr, nextMovePeriod);
        this._snakeIA = snakeIA;
        this._birthTick = birthTick;
    }

    get birthTick(){
        return this._birthTick;
    }

    nextMove(nextHeadPos){
        this._move = this._snakeIA.nextMove(this);
        super.nextMove(nextHeadPos);
    }
}

export {IASnake};