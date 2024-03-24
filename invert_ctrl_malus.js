import {Malus} from './malus.js';
import {invert} from './point.js';

class InvertCtrlMalus extends Malus{
    constructor(tickDuration){
        super(tickDuration)
    }

    getMoveDirection(snake, moveDirection){
        return invert(moveDirection);
    }
}

export {InvertCtrlMalus};