// ==== Lap 01
// 1. Create a class Person with attributes name and age. Write a method to display this information.

class Person {
  constructor(
    public name: string,
    public age: number,
  ) {}

  display(): void {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }
}

const person = new Person("Nguyen", 20);
person.display();
