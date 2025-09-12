"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
const generator = simpleGenerator();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
for (const i of simpleGenerator()) {
    console.log(i);
}
//# sourceMappingURL=generator.js.map