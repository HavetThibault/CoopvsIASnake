function equals(p1, p2){
    return p1 != null && p2 != null && p1.x == p2.x && p2.y == p2.y;
}

function invert(p1){
    p1.x = -p1.x;
    p1.y = -p1.y;
}

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export {Point, equals, invert};