
class Level{
    constructor(snake1Pos, snake2Pos, generateOpponents, snake1TargetScore, snake2TargetScore){
        this._generateOpponents = generateOpponents
        this._snake1TargetScore = snake1TargetScore
        this._snake2TargetScore = snake2TargetScore
        this._snake1Pos = snake1Pos;
        this._snake2Pos = snake2Pos;
    }

    get snake1Pos(){
        return this._snake1Pos;
    }

    get snake2Pos(){
        return this._snake2Pos;
    }

    get generateOpponents(){
        return this._generateOpponents
    }

    get snake1TargetScore(){
        return this._snake1TargetScore
    }

    get snake2TargetScore(){
        return this._snake2TargetScore
    }
}

export {Level};