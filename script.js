import {Game} from './game.js';
import {linkSnakeControllers} from './snake_controllers.js';
import {GameRenderer} from './game_renderer.js';
import {Point} from './point.js';

const cellWidth = 20;
const cellHeight = 20;
const snake1Pos = new Point(15, 5);
const snake2Pos = new Point(5, 5);
const opponnentsPositions = [new Point(5, 15), new Point(15, 15)];

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const xCellNbr = canvas.width / cellWidth;
const yCellNbr = canvas.height / cellHeight;

var game = new Game(snake1Pos, snake2Pos, xCellNbr, yCellNbr, opponnentsPositions);
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