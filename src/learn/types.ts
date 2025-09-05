interface Vector2D{
    x: number;
    y: number;
}

function dotProduct(vector1: Vector2D, vector2: Vector2D) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y) 
}

console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x : 3, y : 2 }, { x : 4, y : 5 })); // doit afficher 22
    
interface Shape {
    readonly name: string;
    readonly isPolygon: boolean;
    getArea(): number;
}

abstract class AbstractShape implements Shape{
    readonly name: string;
    readonly isPolygon: boolean;
    constructor(name: string, isPolygon: boolean)
    {
        this.name = name;
        this.isPolygon = isPolygon;
    }
    abstract getArea():number;
}

class Rectangle extends AbstractShape{
    private _width: number;
    private _height: number;
    constructor(name: string, width: number, height: number)
    {
        super(name, true);
        this._width = width;
        this._height = height;
    }
    getArea(): number{
        return (this._width * this._height);
    }
}

class Circle extends AbstractShape
{
    private _radius: number;
    constructor(name: string, radius: number){
        super(name, false);
        this._radius = radius;
    }
    getArea(): number {
        return (Math.PI * this._radius * this._radius)
    }
}