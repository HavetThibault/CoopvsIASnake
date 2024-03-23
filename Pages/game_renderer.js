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
        
        this.drawFood(game.foodPos1);
        this.drawFood(game.foodPos2);
    }

    drawSnake(snake){
        this.context.fillStyle = 'green';
        // drawing 1 px smaller than the grid creates a grid 
        // effect in the snake body so you can see how long it is
        snake.bodyParts.foreach(bodyPart => {
            this.context.fillRect(
                bodyPart.x * this.cellWidth, 
                bodyPart.y * this.cellHeight, 
                this.cellWidth-1, 
                this.cellHeight-1);
        });
    }

    drawFood(foodPos){
        this.context.fillStyle = 'red';
        context.fillRect(
            foodPos.x * this.cellWidth, 
            foodPos.y * this.cellHeight,
            this.cellWidth-1,
            this.cellHeight-1);
    }
}

export {GameRenderer};