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

class Square extends Rectangle{
    constructor(name: string, side: number)
    {
        super(name, side, side)
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