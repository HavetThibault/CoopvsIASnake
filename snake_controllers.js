const qKey = 113;
const zKey = 122;
const dKey = 100;
const sKey = 115;

const kKey = 107;
const oKey = 111;
const lKey = 108;
const mKey = 109;

const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;


const stepNbr = 1;

function linkSnakeControllers(game, document){
    document.addEventListener('keydown', function(mouseEvent) {
        processSnakeController(mouseEvent, game.snake1, qKey, dKey, zKey, sKey);
        processSnakeController(mouseEvent, game.snake2, leftArrow, rightArrow, upArrow, downArrow);
    });
}

function processSnakeController(mouseEvent, snake, left, right, up, down){
    if (mouseEvent.which == left && snake.moveDirection.x == 0) {
        snake.moveDirection.x = -stepNbr;
        snake.moveDirection.y = 0;
    }
    else if (mouseEvent.which == right && snake.moveDirection.x == 0) {
        snake.moveDirection.x = stepNbr;
        snake.moveDirection.y = 0;
    }
    else if (mouseEvent.which == up && snake.moveDirection.y == 0) {
        snake.moveDirection.y = -stepNbr;
        snake.moveDirection.x = 0;
    }
    else if (mouseEvent.which == down && snake.moveDirection.y == 0) {
        snake.moveDirection.y = stepNbr;
        snake.moveDirection.x = 0;
    }
}

export {linkSnakeControllers};