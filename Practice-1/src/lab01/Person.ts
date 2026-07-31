// --- Lap 01 ---
// 1. Create a class Person with attributes name and age. Write a method to display this information.
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
// console.log("--- Test Lap 01 ---");
// const person = new Person("Nguyen Nam Trung Nguyen", 21);
// person.display();
