class Annimal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class Dogs extends Annimal {
  bark(): void {
    console.log(`${this.name}: says Woof!`);
  }
}

export class Cats extends Annimal {
  meow(): void {
    console.log(`${this.name}: says Meow!`);
  }
}
