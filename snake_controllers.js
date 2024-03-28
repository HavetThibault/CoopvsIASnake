import {Point} from './point.js'

const qKey = 81;
const zKey = 90;
const dKey = 68;
const sKey = 83;

const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;


const stepNbr = 1;
let direction = new Point(0, 0)

function linkSnakeControllers(game, document){
    document.addEventListener('keydown', function(mouseEvent) {
        processSnakeController(mouseEvent, game.snake1, qKey, dKey, zKey, sKey);
        processSnakeController(mouseEvent, game.snake2, leftArrow, rightArrow, upArrow, downArrow);
    });
}

function processSnakeController(mouseEvent, snake, left, right, up, down){
    if (mouseEvent.which == left) {
        direction.x = -stepNbr;
        direction.y = 0;
        snake.setMove(direction);
    }
    else if (mouseEvent.which == right) {
        direction.x = stepNbr;
        direction.y = 0;
        snake.setMove(direction);
    }
    else if (mouseEvent.which == up) {
        direction.x = 0;
        direction.y = -stepNbr;
        snake.setMove(direction);
    }
    else if (mouseEvent.which == down) {
        direction.x = 0;
        direction.y = stepNbr;
        snake.setMove(direction);
    }
}

export {linkSnakeControllers};