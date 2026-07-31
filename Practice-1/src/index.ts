// --- Lap 01 ---
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
console.log("--- Test Lap 01 ---");
const person = new Person("Nguyen Nam Trung Nguyen", 21);
person.display();

// ----------------------------------------------------------------------------- //

// --- Lap 02 ---
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to

class Student extends Person {
  constructor(
    name: string,
    age: number,
    public grade: string,
  ) {
    super(name, age);
  }

  display(): void {
    super.display();
    console.log(`Grade: ${this.grade}`);
  }
}
console.log();

console.log("--- Test Lab 02 ---");
const student = new Student("Nguyen Nam Trung Nguyen", 21, "A");
student.display();

// ----------------------------------------------------------------------------- //
