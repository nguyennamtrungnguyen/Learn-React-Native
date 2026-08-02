export class Person {
  constructor(
    public name: string,
    public age: number,
  ) {}

  display(): void {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }
}

