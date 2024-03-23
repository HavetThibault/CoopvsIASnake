
class Malus {
    constructor(tickDuration){
        this._tickDuration = tickDuration;
    }

    get tickDuration(){
        return this._tickDuration;
    }

    getMoveDirection(snake){
        return snake.moveDirection;
    }
}