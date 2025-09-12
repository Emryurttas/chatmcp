"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = exports.Square = exports.Rectangle = exports.AbstractShape = void 0;
exports.printShape = printShape;
class AbstractShape {
    name;
    isPolygon;
    constructor(name, isPolygon) {
        this.name = name;
        this.isPolygon = isPolygon;
    }
}
exports.AbstractShape = AbstractShape;
class Rectangle extends AbstractShape {
    _width;
    _height;
    constructor(name, width, height) {
        super(name, true);
        this._width = width;
        this._height = height;
    }
    getArea() {
        return this._width * this._height;
    }
}
exports.Rectangle = Rectangle;
class Square extends Rectangle {
    constructor(name, side) {
        super(name, side, side);
    }
}
exports.Square = Square;
class Circle extends AbstractShape {
    _radius;
    constructor(name, radius) {
        super(name, false);
        this._radius = radius;
    }
    getArea() {
        return Math.PI * this._radius * this._radius;
    }
}
exports.Circle = Circle;
function printShape(shape) {
    const polygonText = shape.isPolygon ? "est un polygone" : "n'est pas un polygone";
    console.log(`${shape.name} ${polygonText}. Son aire est ${shape.getArea()}.`);
}
//# sourceMappingURL=shapes.js.map