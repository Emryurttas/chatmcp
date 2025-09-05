"use strict";
// Ajoutez les annotations de types pour les variables suivantes :
Object.defineProperty(exports, "__esModule", { value: true });
let firstName = "Bob";
let age = 25;
let isStudent = true;
let marks = [9, 14.5, 18];
function dotProduct(vector1, vector2) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y);
}
console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x: 3, y: 2 }, { x: 4, y: 5 })); // doit afficher 22
//# sourceMappingURL=types.js.map