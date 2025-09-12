export interface Shape {
    readonly name: string;
    readonly isPolygon: boolean;
    getArea(): number;
}

export abstract class AbstractShape implements Shape {
    readonly name: string;
    readonly isPolygon: boolean;

    constructor(name: string, isPolygon: boolean) {
        this.name = name;
        this.isPolygon = isPolygon;
    }

    abstract getArea(): number;
}

export class Rectangle extends AbstractShape {
    private _width: number;
    private _height: number;

    constructor(name: string, width: number, height: number) {
        super(name, true);
        this._width = width;
        this._height = height;
    }

    getArea(): number {
        return this._width * this._height;
    }
}

export class Square extends Rectangle {
    constructor(name: string, side: number) {
        super(name, side, side);
    }
}

export class Circle extends AbstractShape {
    private _radius: number;

    constructor(name: string, radius: number) {
        super(name, false);
        this._radius = radius;
    }

    getArea(): number {
        return Math.PI * this._radius * this._radius;
    }
}

export function printShape(shape: Shape): void {
    const polygonText = shape.isPolygon ? "est un polygone" : "n'est pas un polygone";
    console.log(`${shape.name} ${polygonText}. Son aire est ${shape.getArea()}.`);
}
