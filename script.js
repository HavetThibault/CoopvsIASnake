import {Game} from './game.js';
import {linkSnakeControllers} from './snake_controllers.js';
import {GameRenderer} from './game_renderer.js';
import { getLvl1, getLvl2, getLvl3 } from './level.js';
import { GameAnimator } from './game_animator.js';


const cellWidth = 20;
const cellHeight = 20;

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const xCellNbr = canvas.width / cellWidth;
const yCellNbr = canvas.height / cellHeight;

let levels = [
    getLvl1(xCellNbr, yCellNbr),
    getLvl2(xCellNbr, yCellNbr),
    getLvl3(xCellNbr, yCellNbr),
]

const score1Label = document.getElementById('score1Label');
const score2Label = document.getElementById('score2Label');
const gameAnimator = new GameAnimator(canvas, score1Label, score2Label);
const game = new Game(xCellNbr, yCellNbr, levels, gameAnimator);
const gameRenderer = new GameRenderer(context, canvas.width, canvas.height, cellWidth, cellHeight);
const gameAnimator = new OutsideGameAnimator();

// Game loop
function loop() {
    requestAnimationFrame(loop);
    game.playTick();
    gameRenderer.renderGameFrame(game);
}

linkSnakeControllers(game, document);

// Start the game
requestAnimationFrame(loop);