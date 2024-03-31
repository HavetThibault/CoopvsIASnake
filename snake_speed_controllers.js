class SnakeSpeedController{
    constructor(snake1Ctrl, snake2Ctrl){
        this._snake1Ctrl = snake1Ctrl;
        this._snake2Ctrl = snake2Ctrl;
    }

    get snake1SpeedRatio(){
        return 1 - (Number(this._snake1Ctrl.value) / 100);
    }

    get snake2SpeedRatio(){
        return 1 - (Number(this._snake2Ctrl.value) / 100);
    }
}

export {SnakeSpeedController};