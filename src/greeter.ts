
export class Greeter {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): string {
        return (`Hi, ${this.name}!`);
    }
}