// Import
import Person = require("./lab01/Person");
import { Student } from "./lab02/Student";
import { Car } from "./lab03/Car";

// --- Lap 01 ---
// 1. Create a class Person with attributes name and age. Write a method to display this information.

console.log("--- Test Lap 01 ---");
const person = new Person.Person("Nguyen Nam Trung Nguyen", 21);
person.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 02 ---
// 2. Write a class Student extending Person with an additional attribute grade. Add a method to

console.log();
console.log("--- Test Lab 02 ---");
const student = new Student("Nguyen Nam Trung Nguyen", 21, "A");
student.display();

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --- Lap 03 ---
// 3. Create a class Car with properties brand, model, year. Write a method to show car info.

console.log();
console.log("--- Test Lab 03 ---");
const car = new Car("Mercedes", "Maybach SL 680", 2024);
car.ShowCarInfo();
