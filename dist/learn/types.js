"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shapes_js_1 = require("./shapes.js");
// interface Vector2D{
//     x: number;
//     y: number;
// }
// function dotProduct(vector1: Vector2D, vector2: Vector2D) {
//     return (vector1.x * vector2.x) + (vector1.y * vector2.y) 
// }
// console.log("dotProduct ---------------------------------------------------");
// console.log(dotProduct({ x : 3, y : 2 }, { x : 4, y : 5 })); // doit afficher 22
const rectangle = new shapes_js_1.Rectangle("Rectangle", 2, 4);
const square = new shapes_js_1.Square("Carré", 3);
const circle = new shapes_js_1.Circle("Cercle", 10);
(0, shapes_js_1.printShape)(rectangle); // doit afficher "Rectangle est un polygone. Son aire est 8."
(0, shapes_js_1.printShape)(square); // doit afficher "Carré est un polygone. Son aire est 9."
(0, shapes_js_1.printShape)(circle); // doit afficher "Cercle n'est pas un polygone. Son aire est 314.1592653589793"
//# sourceMappingURL=types.js.map