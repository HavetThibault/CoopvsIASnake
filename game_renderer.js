const red1Color = '#ff0099'
const blue1Color = '#9900ff'
const green1Color = '#99dd00'

class GameRenderer{
    constructor(context, width, height, cellWidth, cellHeight){
        this.context = context;
        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    renderGameFrame(game){
        this.context.clearRect(0,0,this.width,this.height);
    
        this.drawSnake(game.snake1, red1Color);
        this.drawSnake(game.snake2, green1Color);
        for (let i = game.opponents.length - 1; i >= 0; i--) {
            this.drawSnake(game.opponents[i], blue1Color);
        }
        
        this.drawFood(game.foodPos1, red1Color);
        this.drawFood(game.foodPos2, green1Color);
    }

    drawSnake(snake, color){
        this.context.fillStyle = color;
        // drawing 1 px smaller than the grid creates a grid 
        // effect in the snake body so you can see how long it is
        for (let i = snake.bodyParts.length - 1; i >= 0; i--) {
            this.context.fillRect(
                snake.bodyParts[i].x * this.cellWidth, 
                snake.bodyParts[i].y * this.cellHeight, 
                this.cellWidth-1,
                this.cellHeight-1);
        }
    }

    drawFood(foodPos, color){
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.ellipse(
            foodPos.x * this.cellWidth + this.cellWidth/2, 
            foodPos.y * this.cellHeight + this.cellHeight/2,
            this.cellWidth/2-1,
            this.cellHeight/2-1,
            0, 0, 2 * Math.PI);
        this.context.fill();
    }
}

export {GameRenderer};