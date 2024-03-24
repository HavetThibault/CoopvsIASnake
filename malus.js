
class Malus {
    constructor(tickDuration){
        this._tickDuration = tickDuration;
    }

    get tickDuration(){
        return this._tickDuration;
    }

    set tickDuration(value){
        this._tickDuration = value;
    }

    getMoveDirection(snake, moveDirection){
        return snake.moveDirection;
    }
}

export {Malus};