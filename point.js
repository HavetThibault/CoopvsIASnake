function equals(p1, p2){
    return p1 != null && p2 != null && p1.x == p2.x && p1.y == p2.y;
}

function invert(p1){
    p1.x = -p1.x;
    p1.y = -p1.y;
}

function add(p1, p2){
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function copy(p1){
    return new Point(p1.x, p1.y);
}

function toString(p1){
    return '(' + p1.x + ',' + p1.y + ')';
}

class Point{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }

    get x(){
        return this._x;
    }

    set x(value){
        this._x = value;
    }

    get y(){
        return this._y;
    }

    set y(value){
        this._y = value;
    }
}

export {Point, equals, invert, add, copy, toString};