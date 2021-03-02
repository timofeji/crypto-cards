
export class Card {
    name: string;
    description: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): string {
        return (`Hi, ${this.name}!`);
    }
}