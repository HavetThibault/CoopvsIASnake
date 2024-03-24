const qKey = 81;
const zKey = 90;
const dKey = 68;
const sKey = 83;

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