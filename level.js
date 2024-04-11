
class Level{
    constructor(snake1Pos, snake1Move, snake1Speed, snake1TargetScore, snake2Pos,
        snake2Move, snake2Speed, snake2TargetScore, generateOpponents, xCellsNbr, yCellsNbr,
        snake1Len, snake2Len) {
        this._generateOpponents = generateOpponents
        this._snake1TargetScore = snake1TargetScore
        this._snake2TargetScore = snake2TargetScore
        this._snake1Pos = snake1Pos;
        this._snake1Move = snake1Move;
        this._snake1Speed = snake1Speed;
        this._snake2Pos = snake2Pos;
        this._snake2Move = snake2Move;
        this._snake2Speed = snake2Speed;
        this._xCellsNbr = xCellsNbr;
        this._yCellsNbr = yCellsNbr;
        this._snake1Len = snake1Len;
        this._snake2Len = snake2Len;
    }

    get snake1Pos(){
        return this._snake1Pos;
    }

    get snake1Move() {
        return this._snake1Move;
    }

    get snake1Speed() {
        return this._snake1Speed;
    }

    get snake2Pos(){
        return this._snake2Pos;
    }

    get snake2Move() {
        return this._snake2Move;
    }

    get snake2Speed() {
        return this._snake2Speed;
    }

    get snake1TargetScore(){
        return this._snake1TargetScore
    }

    get snake2TargetScore(){
        return this._snake2TargetScore
    }

    get snake1Len(){
        return this._snake1Len;
    }

    get snake2Len(){
        return this._snake2Len;
    }

    generateOpponents(){
        return this._generateOpponents(this._xCellsNbr, this._yCellsNbr)
    }
}

export {Level};