import {Game} from './game.js';
import {linkSnakeControllers} from './snake_controllers.js';
import {GameRenderer} from './game_renderer.js';
import { getLvl1, getLvl2, getLvl3, getLvl4, getLvl5 } from './game_levels.js';
import { GameAnimator } from './game_animator.js';
import { SnakeSpeedController } from './snake_speed_controllers.js';


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
    getLvl4(xCellNbr, yCellNbr),
    getLvl5(xCellNbr, yCellNbr),
]

const score1Label = document.getElementById('score1Label');
const score2Label = document.getElementById('score2Label');
const snake1SpeedSlider = document.getElementById('fushiaSnakeSpeed');
const snake2SpeedSlider = document.getElementById('greenSnakeSpeed');
const lvlLabel = document.getElementById('lvlIndicator');
const gameAnimator = new GameAnimator(canvas, lvlLabel, score1Label, score2Label);
const snakeSpeedCtrl = new SnakeSpeedController(snake1SpeedSlider, snake2SpeedSlider);
const game = new Game(xCellNbr, yCellNbr, levels, gameAnimator, snakeSpeedCtrl);
const gameRenderer = new GameRenderer(context, canvas.width, canvas.height, cellWidth, cellHeight);

// Game loop
function loop() {
    requestAnimationFrame(loop);
    game.playTick();
    gameRenderer.renderGameFrame(game);
}

linkSnakeControllers(game, document);

// Start the game
requestAnimationFrame(loop);