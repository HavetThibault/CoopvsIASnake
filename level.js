import { Point, copy, add } from './point.js';
import { IASnake } from './IA_snake.js'

class Level{
    constructor(snake1Pos, snake1Move, snake1Speed, snake1TargetScore, snake2Pos,
        snake2Move, snake2Speed, snake2TargetScore, generateOpponents, xCellsNbr, yCellsNbr) {
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

    get generateOpponents(){
        return this._generateOpponents(this._xCellsNbr, this._yCellsNbr)
    }

    get snake1TargetScore(){
        return this._snake1TargetScore
    }

    get snake2TargetScore(){
        return this._snake2TargetScore
    }
}

const lvl1Speed = 5;
const lvl2Speed = lvl1Speed;
const lvl3Speed = lvl2Speed - 1;
const lvl4Speed = lvl3Speed;
const lvl5Speed = lvl4Speed - 1;
const lvl6Speed = lvl5Speed - 1;

function lvl1Opponents(xCellsNbr, yCellsNbr) {
    return [];
}

function getLvl1(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl1Speed,
        5,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        5,
        lvl1Speed,
        lvl1Opponents
    )
}

function stepSnakes(startPos, width, length, speed, move1, move2, movePeriod, birthTick) {
    let snakes = []
    for (let i = width; i >= 0; i--) {
        snakes.push(
            new IASnake(
                add(startPos, new Point(i, i)),
                copy(move1),
                length,
                speed,
                new LoopSnakeIA([[copy(move1), movePeriod], [copy(move2), movePeriod]]),
                birthTick));
    }
    return snakes;
}

function lvl2Opponents(xCellsNbr, yCellsNbr) {
    return
        stepSnakes(
            new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
            2,
            10,
            5,
            new Point(0, 1),
            new Point(1, 0),
            4,
            1)
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                5,
                new Point(0, 1),
                new Point(-1, 0),
                4,
                1)
    );
}

function getLvl2(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl2Speed,
        5,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        5,
        lvl2Speed,
        lvl2Opponents
    )
}

function lvl3Opponents(xCellsNbr, yCellsNbr) {
    return lvl2Opponents(xCellsNbr, yCellsNbr)
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                5,
                new Point(0, -1),
                new Point(1, 0),
                4,
                1))
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                5,
                new Point(0, -1),
                new Point(-1, 0),
                4,
                1)
        );
}

function getLvl3(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl2Speed,
        5,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        5,
        lvl3Speed,
        lvl3Opponents
    )
}


export { Level, getLvl1, getLvl2, getLvl3 };