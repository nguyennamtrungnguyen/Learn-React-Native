interface Animal {
  name: string;
  sound(): void;
}

export class Dog implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log("Woof! Woof!");
  }
}

export class Cat implements Animal {
  constructor(public name: string) {}

  sound(): void {
    console.log("Meow! Meow!");
  }
}
