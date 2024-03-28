import {Game} from './game.js';
import {linkSnakeControllers} from './snake_controllers.js';
import {GameRenderer} from './game_renderer.js';
import {IASnake} from './IA_snake.js'; 
import {LoopSnakeIA} from './loop_snake_IA.js';
import {Point, copy} from './point.js'; 


const opponentInitMove = new Point(1, 0)
const cellWidth = 20;
const cellHeight = 20;
const snake1Pos = new Point(15, 5);
const snake2Pos = new Point(5, 5);
const getOpponentsFunc = function getOpponents(){
    return [
        new IASnake(
            new Point(15, 15),
            copy(opponentInitMove), 
            10, 
            6,
            new LoopSnakeIA([[new Point(0, 1), 3], [new Point(1, 0), 4]]),
            1),
        new IASnake(
            new Point(16, 16),
            copy(opponentInitMove), 
            10, 
            6,
            new LoopSnakeIA([[new Point(0, 1), 3], [new Point(1, 0), 4]]),
            1)
    ];
}

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const xCellNbr = canvas.width / cellWidth;
const yCellNbr = canvas.height / cellHeight;

var game = new Game(snake1Pos, snake2Pos, xCellNbr, yCellNbr, getOpponentsFunc);
var gameRenderer = new GameRenderer(context, canvas.width, canvas.height, cellWidth, cellHeight);

// Game loop
function loop() {
    requestAnimationFrame(loop);
    game.playTick();
    gameRenderer.renderGameFrame(game);
}

linkSnakeControllers(game, document);

// Start the game
requestAnimationFrame(loop);