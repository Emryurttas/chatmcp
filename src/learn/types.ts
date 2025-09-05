
// Ajoutez les annotations de types pour les variables suivantes :

let firstName: string = "Bob";
let age: number = 25;
let isStudent: boolean = true;
let marks: number[] = [ 9, 14.5, 18 ];
        

type Vector2D = {x: number, y: number};

function dotProduct(vector1: Vector2D, vector2: Vector2D) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y) 
}

console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x : 3, y : 2 }, { x : 4, y : 5 })); // doit afficher 22
    
