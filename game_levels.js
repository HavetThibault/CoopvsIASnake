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

function verticalSnake(startPos, width, length, speed, move, birthTick){
    let snakes = []
    for (let i = width; i >= 0; i--) {
        snakes.push(
            new IASnake(
                add(startPos, new Point(i, 0)),
                copy(move),
                length,
                speed,
                new LoopSnakeIA([[copy(move), 1]]),
                birthTick));
    }
    return snakes;
}

function horizontalSnake(startPos, width, length, speed, move, birthTick){
    let snakes = []
    for (let i = width; i >= 0; i--) {
        snakes.push(
            new IASnake(
                add(startPos, new Point(0, i)),
                copy(move),
                length,
                speed,
                new LoopSnakeIA([[copy(move), 1]]),
                birthTick));
    }
    return snakes;
}

const lvlSpeed = 8;

const lvl1Snake1TargetScore = 13;
const lvl1Snake2TargetScore = 13;
const lvl1Snake1Len = 10;
const lvl1Snake2Len = 10;

const lvl2Snake1TargetScore = 5;
const lvl2Snake2TargetScore = 5;
const lvl2Snake1Len = 2;
const lvl2Snake2Len = 2;

const lvl3Snake1TargetScore = 5;
const lvl3Snake2TargetScore = 5;
const lvl3Snake1Len = 2;
const lvl3Snake2Len = 2;

const lvl4Snake1TargetScore = 5;
const lvl4Snake2TargetScore = 5;
const lvl4Snake1Len = 2;
const lvl4Snake2Len = 2;

const lvl5Snake1TargetScore = 18;
const lvl5Snake2TargetScore = 18;
const lvl5Snake1Len = 15;
const lvl5Snake2Len = 15;

const lvl6Snake1TargetScore = 5;
const lvl6Snake2TargetScore = 5;
const lvl6Snake1Len = 2;
const lvl6Snake2Len = 2;

const lvl7Snake1TargetScore = 5;
const lvl7Snake2TargetScore = 5;
const lvl7Snake1Len = 2;
const lvl7Snake2Len = 2;

const lvl8Snake1TargetScore = 5;
const lvl8Snake2TargetScore = 5;
const lvl8Snake1Len = 2;
const lvl8Snake2Len = 2;

const lvl9Snake1TargetScore = 25;
const lvl9Snake2TargetScore = 30;
const lvl9Snake1Len = 21;
const lvl9Snake2Len = 26;


// const lvl1Snake1TargetScore = 6;
// const lvl1Snake2TargetScore = 6;
// const lvl1Snake1Len = 6;
// const lvl1Snake2Len = 6;

// const lvl2Snake1TargetScore = 2;
// const lvl2Snake2TargetScore = 2;
// const lvl2Snake1Len = 2;
// const lvl2Snake2Len = 2;

// const lvl3Snake1TargetScore = 2;
// const lvl3Snake2TargetScore = 2;
// const lvl3Snake1Len = 2;
// const lvl3Snake2Len = 2;

// const lvl4Snake1TargetScore = 2;
// const lvl4Snake2TargetScore = 2;
// const lvl4Snake1Len = 2;
// const lvl4Snake2Len = 2;

// const lvl5Snake1TargetScore = 12;
// const lvl5Snake2TargetScore = 12;
// const lvl5Snake1Len = 12;
// const lvl5Snake2Len = 12;

// const lvl6Snake1TargetScore = 2;
// const lvl6Snake2TargetScore = 2;
// const lvl6Snake1Len = 2;
// const lvl6Snake2Len = 2;

// const lvl7Snake1TargetScore = 2;
// const lvl7Snake2TargetScore = 2;
// const lvl7Snake1Len = 2;
// const lvl7Snake2Len = 2;

// const lvl8Snake1TargetScore = 2;
// const lvl8Snake2TargetScore = 2;
// const lvl8Snake1Len = 2;
// const lvl8Snake2Len = 2;

// const lvl9Snake1TargetScore = 19;
// const lvl9Snake2TargetScore = 18;
// const lvl9Snake1Len = 18;
// const lvl9Snake2Len = 18;


const lvl2OpponentSpeed = 14;
const lvl3OpponentSpeed = 14;
const lvl4OpponentSpeed = 20;
const lvl6OpponentSpeed = 20;
const lvl7OpponentSpeed = 10;
const lvl8OpponentSpeed = 12;

function noOpponents(xCellsNbr, yCellsNbr) {
    return [];
}

function getLvl1(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl1Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl1Snake2TargetScore,
        noOpponents,
        xCellsNbr,
        yCellsNbr,
        lvl1Snake1Len,
        lvl1Snake2Len
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
        lvlSpeed,
        lvl2Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl2Snake2TargetScore,
        lvl2Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl2Snake1Len,
        lvl2Snake2Len
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
        lvlSpeed,
        lvl3Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl3Snake2TargetScore,
        lvl3Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl3Snake1Len,
        lvl3Snake2Len
    )
}

function lvl4Opponents(xCellsNbr, yCellsNbr) {
    return horizontalSnake(
        new Point(xCellsNbr - 1, 0),
        6,
        2,
        lvl4OpponentSpeed,
        new Point(-1, 0),
        0)
    .concat(
        horizontalSnake(
            new Point(xCellsNbr - 1, yCellsNbr - 10),
            9,
            2,
            lvl4OpponentSpeed,
            new Point(-1, 0),
            0))
    .concat(
        horizontalSnake(
            new Point(xCellsNbr/2, yCellsNbr/2 - 4),
            9,
            2,
            lvl4OpponentSpeed,
            new Point(-1, 0),
            0));
}

function getLvl4(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl4Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl4Snake2TargetScore,
        lvl4Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl4Snake1Len,
        lvl4Snake2Len
    )
}

function getLvl5(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl5Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl5Snake2TargetScore,
        noOpponents,
        xCellsNbr,
        yCellsNbr,
        lvl5Snake1Len,
        lvl5Snake2Len
    )
}

function lvl6Opponents(xCellsNbr, yCellsNbr) {
    return verticalSnake(
        new Point(xCellsNbr - 6, yCellsNbr),
        5,
        2,
        lvl6OpponentSpeed,
        new Point(0, -1),
        0)
    .concat(
        verticalSnake(
            new Point(0, yCellsNbr),
            5,
            2,
            lvl6OpponentSpeed,
            new Point(0, -1),
            0))
    .concat(
        verticalSnake(
            new Point(18, yCellsNbr),
            8,
            2,
            lvl6OpponentSpeed,
            new Point(0, -1),
            0))
    .concat(
        verticalSnake(
            new Point(14, yCellsNbr/2),
            12,
            2,
            lvl6OpponentSpeed,
            new Point(0, -1),
            0));
}

function getLvl6(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl6Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl6Snake2TargetScore,
        lvl6Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl6Snake1Len,
        lvl6Snake2Len
    )
}

function lvl7Opponents(xCellsNbr, yCellsNbr) {
    return stepSnakes(
            new Point(Number(0.5 * xCellsNbr), Number(0.5 * yCellsNbr) + 1),
            2,
            10,
            lvl7OpponentSpeed,
            new Point(0, 1),
            new Point(1, 0),
            4,
            1)
        .concat(
            stepSnakes(
                new Point(Number(Math.round(0.5 * xCellsNbr)), Number(Math.round(0.5 * yCellsNbr)) + 1),
                2,
                10,
                lvl7OpponentSpeed,
                new Point(0, 1),
                new Point(-1, 0),
                4,
                1));
}

function getLvl7(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl7Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl7Snake2TargetScore,
        lvl7Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl7Snake1Len,
        lvl7Snake2Len
    )
}

function lvl8Opponents(xCellsNbr, yCellsNbr) {
    return lvl7Opponents(xCellsNbr, yCellsNbr)
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                lvl8OpponentSpeed,
                new Point(0, -1),
                new Point(1, 0),
                3,
                0))
        .concat(
            stepSnakes(
                new Point(Math.round(0.5 * xCellsNbr), Math.round(0.5 * yCellsNbr) + 1),
                2,
                10,
                lvl8OpponentSpeed,
                new Point(0, -1),
                new Point(-1, 0),
                3,
                0)
        );
}

function getLvl8(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl8Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl8Snake2TargetScore,
        lvl8Opponents,
        xCellsNbr,
        yCellsNbr,
        lvl8Snake1Len,
        lvl8Snake2Len
    )
}

function getLvl9(xCellsNbr, yCellsNbr) {
    return new Level(
        new Point(Math.round(0.2 * xCellsNbr), Math.round(0.2 * yCellsNbr) + 1),
        new Point(1, 0),
        lvlSpeed,
        lvl9Snake1TargetScore,
        new Point(Math.round(0.8 * xCellsNbr), Math.round(0.2 * yCellsNbr)),
        new Point(-1, 0),
        lvlSpeed,
        lvl9Snake2TargetScore,
        noOpponents,
        xCellsNbr,
        yCellsNbr,
        lvl9Snake1Len,
        lvl9Snake2Len
    )
}


export { getLvl1, getLvl2, getLvl3, getLvl4, getLvl5, getLvl6, getLvl7, getLvl8, getLvl9 };