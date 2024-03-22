import {Malus} from 'malus.js';
import {revert} from 'point.js';

class InvertCtrlMalus extends Malus{
    getMoveDirection(snake){
        return revert(snake.moveDirection);
    }
}

export {InvertCtrlMalus};