"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dotProduct(vector1, vector2) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y);
}
console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x: 3, y: 2 }, { x: 4, y: 5 })); // doit afficher 22
//# sourceMappingURL=types.js.map