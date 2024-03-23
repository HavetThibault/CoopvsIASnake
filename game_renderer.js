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
    
        this.drawSnake(game.snake1);
        this.drawSnake(game.snake2);
        for (let i = game.opponents.length - 1; i >= 0; i--) {
            this.drawSnake(game.opponents[i]);
        }
        
        this.drawFood(game.foodPos1);
        this.drawFood(game.foodPos2);
    }

    drawSnake(snake){
        this.context.fillStyle = 'green';
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

    drawFood(foodPos){
        if(foodPos == null){
            return;
        }
        this.context.fillStyle = 'red';
        this.context.fillRect(
            foodPos.x * this.cellWidth, 
            foodPos.y * this.cellHeight,
            this.cellWidth-1,
            this.cellHeight-1);
    }
}

export {GameRenderer};