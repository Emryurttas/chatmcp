export interface Shape {
    readonly name: string;
    readonly isPolygon: boolean;
    getArea(): number;
}
export declare abstract class AbstractShape implements Shape {
    readonly name: string;
    readonly isPolygon: boolean;
    constructor(name: string, isPolygon: boolean);
    abstract getArea(): number;
}
export declare class Rectangle extends AbstractShape {
    private _width;
    private _height;
    constructor(name: string, width: number, height: number);
    getArea(): number;
}
export declare class Square extends Rectangle {
    constructor(name: string, side: number);
}
export declare class Circle extends AbstractShape {
    private _radius;
    constructor(name: string, radius: number);
    getArea(): number;
}
export declare function printShape(shape: Shape): void;
//# sourceMappingURL=shapes.d.ts.map