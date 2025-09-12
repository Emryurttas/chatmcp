function *simpleGenerator(): Generator<number> {
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

function* range(min: number, max: number): Generator<number> {
    for (let i = min; i <= max; i++) {
        yield i;
    }
}

for (const i of range(5, 10)) {
    console.log(i);
}
