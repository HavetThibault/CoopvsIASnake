import { Point, copy, add } from './point.js';
import { IASnake } from './IA_snake.js'
import { LoopSnakeIA } from './loop_snake_IA.js'
import {Level} from './level.js'


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

function waveSnakes(startPos, width, length, speed, move1, move2, move3, move4, movePeriod, birthTick){
    let snakes = []
    for (let i = width; i >= 0; i--) {
        snakes.push(
            new IASnake(
                add(startPos, new Point(i, i)),
                copy(move1),
                length,
                speed,
                new LoopSnakeIA([[copy(move1), movePeriod], [copy(move2), movePeriod], [copy(move3), movePeriod], [copy(move4), movePeriod]]),
                birthTick));
    }
    return snakes;
}

const lvl1Speed = 8;
const lvl2Speed = 8;
const lvl3Speed = 8;
const lvl4Speed = 8;
const lvl5Speed = 8;

const lvl1Snake1TargetScore = 6;
const lvl1Snake2TargetScore = 6;
const lvl2Snake1TargetScore = 5;
const lvl2Snake2TargetScore = 5;
const lvl3Snake1TargetScore = 5;
const lvl3Snake2TargetScore = 5;
const lvl4Snake1TargetScore = 4;
const lvl4Snake2TargetScore = 4;
const lvl5Snake1TargetScore = 4;
const lvl5Snake2TargetScore = 4;

const lvl2OpponentSpeed = 13;
const lvl3OpponentSpeed = 12;
const lvl4OpponentSpeed = 11;
const lvl5OpponentSpeed = 10;

function lvl1Opponents(xCellsNbr, yCellsNbr) {
    return [];
}

function getLvl1(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl1Speed,
        lvl1Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvl1Speed,
        lvl1Snake2TargetScore,
        lvl1Opponents,
        xCellsNbr,
        yCellsNbr
    )
}


function lvl2Opponents(xCellsNbr, yCellsNbr) {
    return waveSnakes(
            new Point(0, Number(0.5 * yCellsNbr) + 1),
            2,
            10,
            lvl2OpponentSpeed,
            new Point(1, 0),
            new Point(0, -1),
            new Point(1, 0),
            new Point(0, 1),
            4,
            1)
        .concat(
            waveSnakes(
                new Point(Number(Math.round(0.2 * yCellsNbr)) + 1, Number(Math.round(0.8 * yCellsNbr)) + 1),
                2,
                10,
                lvl2OpponentSpeed,
                new Point(1, 0),
                new Point(0, -1),
                new Point(1, 0),
                new Point(0, 1),
                4,
                1));
}

function getLvl2(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl2Speed,
        lvl2Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvl2Speed,
        lvl2Snake2TargetScore,
        lvl2Opponents,
        xCellsNbr,
        yCellsNbr
    )
}

function lvl3Opponents(xCellsNbr, yCellsNbr) {
    return waveSnakes(
        new Point(xCellsNbr - 1, Number(0.5 * yCellsNbr) + 1),
        2,
        10,
        lvl3OpponentSpeed,
        new Point(-1, 0),
        new Point(0, 1),
        new Point(-1, 0),
        new Point(0, -1),
        4,
        1)
    .concat(
        waveSnakes(
            new Point(xCellsNbr - 1, Number(0.8 * yCellsNbr) + 1),
            2,
            10,
            lvl3OpponentSpeed,
            new Point(-1, 0),
            new Point(0, 1),
            new Point(-1, 0),
            new Point(0, -1),
            4,
            1));
}

function getLvl3(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl3Speed,
        lvl3Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvl3Speed,
        lvl3Snake2TargetScore,
        lvl3Opponents,
        xCellsNbr,
        yCellsNbr
    )
}

function lvl4Opponents(xCellsNbr, yCellsNbr) {
    return stepSnakes(
            new Point(Number(0.5 * xCellsNbr), Number(0.5 * yCellsNbr) + 1),
            2,
            10,
            lvl4OpponentSpeed,
            new Point(0, 1),
            new Point(1, 0),
            4,
            1)
        .concat(
            stepSnakes(
                new Point(Number(Math.round(0.5 * xCellsNbr)), Number(Math.round(0.5 * yCellsNbr)) + 1),
                2,
                10,
                lvl4OpponentSpeed,
                new Point(0, 1),
                new Point(-1, 0),
                4,
                1));
}

function getLvl4(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl4Speed,
        lvl4Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvl4Speed,
        lvl4Snake2TargetScore,
        lvl4Opponents,
        xCellsNbr,
        yCellsNbr
    )
}

function lvl5Opponents(xCellsNbr, yCellsNbr) {
    return lvl4Opponents(xCellsNbr, yCellsNbr)
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                lvl5OpponentSpeed,
                new Point(0, -1),
                new Point(1, 0),
                3,
                0))
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                lvl5OpponentSpeed,
                new Point(0, -1),
                new Point(-1, 0),
                3,
                0)
        );
}

function getLvl5(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvl5Speed,
        lvl5Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvl5Speed,
        lvl5Snake2TargetScore,
        lvl5Opponents,
        xCellsNbr,
        yCellsNbr
    )
}


export { getLvl1, getLvl2, getLvl3, getLvl4, getLvl5 };