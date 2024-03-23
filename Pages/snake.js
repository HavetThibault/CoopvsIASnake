import {equals} from 'point.js';

class Snake {
    constructor(initialPos, moveDirection, bodyPartsNbr, nextMovePeriod){
        this.headPos = initialPos;
        this.moveDirection = moveDirection;
        this.bodyPartsNbr = bodyPartsNbr;
        this.bodyParts = [];
        this.bodyParts.push(initialPos);
        this.malus = []
        this.nextMovePeriod = nextMovePeriod;
    }

    nextMove(nextHeadPos){
        this.headPos = nextHeadPos;
        this.bodyParts.unshift(nextHeadPos);
        if(this.bodyParts.length == this.bodyPartsNbr)
            this.bodyParts.pop();
    }

    isBittingItself(){
        return this.isColliding(this.headPos);
    }

    isColliding(pos){
        let result = this.bodyParts.find(bodyPart => equals(bodyPart, pos));
        return result != null;
    }

    removeExpiredMalus(){
        for (let i = this.malus.length - 1; i >= 0; i--) {
            if (this.malus[i].tickDuration === 0) {
                this.malus.splice(i, 1);
            }
        }
    }

    getMoveDirection(){
        let moveDirection = this.moveDirection;
        this.malus.forEach((malus) => {
            moveDirection = malus.getMoveDirection(moveDirection);
        })
        return moveDirection;
    }
}

export {Snake};