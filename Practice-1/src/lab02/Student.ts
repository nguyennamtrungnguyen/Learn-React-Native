import { Person } from "../lab01/Person";

export class Student extends Person {
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
