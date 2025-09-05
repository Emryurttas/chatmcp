"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dotProduct(vector1, vector2) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y);
}
console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x: 3, y: 2 }, { x: 4, y: 5 })); // doit afficher 22
class AbstractShape {
    name;
    isPolygon;
    constructor(name, isPolygon) {
        this.name = name;
        this.isPolygon = isPolygon;
    }
}
class Rectangle extends AbstractShape {
    _width;
    _height;
    constructor(name, width, height) {
        super(name, true);
        this._width = width;
        this._height = height;
    }
    getArea() {
        return (this._width * this._height);
    }
}
class Square extends Rectangle {
    constructor(name, side) {
        super(name, side, side);
    }
}
class Circle extends AbstractShape {
    _radius;
    constructor(name, radius) {
        super(name, false);
        this._radius = radius;
    }
    getArea() {
        return (Math.PI * this._radius * this._radius);
    }
}
//# sourceMappingURL=types.js.map