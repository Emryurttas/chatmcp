"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=shapes.js.map