class Snake {
    constructor(initialPos, moveDirection, bodyPartsNbr, xCellsNbr, yCellsNbr){
        this.headPos = initialPos;
        this.moveDirection = moveDirection;
        this.bodyPartsNbr = bodyPartsNbr;
        this.xCellsNbr = xCellsNbr;
        this.yCellsNbr = yCellsNbr;
        this.bodyParts = [];
        this.bodyParts.push(initialPos);
    }

    nextMove(nextHeadPos){
        this.headPos = nextHeadPos;
        this.bodyParts.unshift(nextHeadPos);
        if(this.bodyParts.length == this.bodyPartsNbr){
            this.bodyParts.pop();
        }
    }
}

export {Snake};