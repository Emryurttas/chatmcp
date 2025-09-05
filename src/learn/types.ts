
// Ajoutez les annotations de types pour les variables suivantes :

let firstName: string = "Bob";
let age: number = 25;
let isStudent: boolean = true;
let marks: number[] = [ 9, 14.5, 18 ];
        

// Ajoutez les annotations de type à la déclaration de la fonction suivante et écrivez son code :

function dotProduct(vector1: {x: number, y: number}, vector2: {x: number, y: number}) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y)
}

console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x : 3, y : 2 }, { x : 4, y : 5 })); // doit afficher 22
        